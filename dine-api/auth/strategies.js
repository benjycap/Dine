const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy } = require('passport-jwt')
const Users = require('../models/userModel');
const roles = require('../enum/roles');

passport.use('register', new LocalStrategy({ session: false, passReqToCallback: true }, 
  async (req, username, password, done) => {
    try {
      const role = {
        '/restaurant': roles.Restaurant,
        '/customer': roles.Customer
      }[req.url];
      const user = await Users.create({ username, password, role });
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

passport.use('login', new LocalStrategy({ session: false },
  async (username, password, done) => {
    try {
      const user = await Users.findOne({ username });

      if (!user) return done(null, false, { message: 'User not found'});
      
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) return done(null, false, { message: 'Wrong Password'})

      return done(null, user, { message: 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: (req) => req && req.cookies ? req.cookies.jwt : null,
  secretOrKey: 'big_secret_key'
}, async (payload, done) => {
  try {
    return done(null, payload);
  } catch (error) {
    done(error);
  }
})); 
