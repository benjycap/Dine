const fetch = require('node-fetch');

let subscribers = [];

function subscribeTo401(callback) {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  }
}

function emit() {
  subscribers.forEach(cb => cb());
}

async function handle(response) {
  if (response.status === 401 /* Unauthorised */) emit();
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      return response;
    }
  } else {
    try {
      const { error } = await response.json();
      return Promise.reject(error || response);
    } catch (e) {
      return Promise.reject(response);
    }
  }
}

// function forwardJwtCookie(req, ...args) {
//   const jwt = req.cookies.jwt;
//   if (jwt) {
//     args[1] = args[1] || {};
//     args[1].credentials = 'include';
//     args[1].headers = { ...args[1].headers, 'Cookie': `jwt=${jwt}` };
//   }
//   return args;
// }

function handledFetch(...args) {
  return fetch(...args).then(handle)
}

// function isoFetch(req, ...args) {
//   if (!req) return handledFetch(...args);
//   const newArgs = forwardJwtCookie(req, ...args);
//   return handledFetch(...newArgs);
// }

module.exports = {
  fetch: handledFetch,
  // isoFetch,
  subscribeTo401
}
