const Customers = require('../models/customerModel');
const Restaurants = require('../models/restaurantModel');
const Tables = require('../models/tableModel');
const roles = require('../enum/roles');

async function getTablesForRestaurant(user) {
  const restaurant = await Restaurants.findOne({ user: user._id }, ['name', 'tables']).populate('tables');
  return restaurant.toJSON().tables.map(table => ({ ...table, name: restaurant.name }));
}

async function getAllTables() {
  const restaurants = await Restaurants.find({}, ['name', 'tables']).populate('tables');
  return restaurants.reduce((acc, restaurant) => {
    return [ ...acc, ...restaurant.tables.map(table => ({ ...table, name: restaurant.name })) ];
  }, [])
}

async function getTableForCustomer(user) {
  return Customers.findOne({ user: user._id }, 'table').populate('table');
}

async function getTableById(user, tableId) {
  const restaurant = await Restaurants.findOne({ user: user._id });
  if (!restaurant.ownsTable(tableId)) throw new Error('Table does not exist or you do not have permission to view it.');
  return Tables.findById(tableId);
}

async function createTable(user, tableData) {
  const restaurant = await Restaurants.findOne({ user: user._id });
  const newTable = await Tables.create(tableData);
  restaurant.tables.push(newTable);
  await restaurant.save();
  return newTable;
}

async function updateTable(user, tableId, tableData) {
  const restaurant = await Restaurants.findOne({ user: user._id });
  if (!restaurant.ownsTable(tableId)) throw new Error('Table does not exist or you do not have permission to modify it.');
  return await Tables.findByIdAndUpdate(tableId, tableData);
}

// Assumption - customer will only be able to add a rating to the table they are assigned
async function rateTable(user, reqBody) {
  const newRating = Number(reqBody.rating);
  if (isNaN(newRating) || newRating < 0 || newRating > 5) throw new Error('Invalid rating');
  const { table } = await getTableForCustomer(user);
  if (!table) throw new Error('You are not currently assigned to a table to rate');
  if (table.timesRated == 0) table.rating = newRating;
  else {
    table.rating = ((table.rating * table.timesRated) + newRating) / (table.timesRated + 1)
  }
  table.timesRated = table.timesRated + 1;
  return await table.save();
}

async function deleteTable(user, tableId) {
  const { role, _id } = user;
  if (role !== roles.Restaurant) throw new Error('Unauthorised');  
  try {
    const restaurant = await Restaurants.findOne({ user: _id });
    if (!restaurant.ownsTable(tableId)) throw new Error();

    restaurant.tables.pull(tableId);
    await Promise.all([
      restaurant.save(),
      Customers.findOneAndUpdate({ table: tableId }, { table: null }),
      Tables.findByIdAndDelete(tableId)
    ]);  
  } catch (e) {
    throw new Error('Table does not exist or you do not have permission to delete it.')
  }
}

module.exports = {
  getAllTables,
  getTablesForRestaurant,
  getTableForCustomer,
  getTableById,
  createTable,
  updateTable,
  rateTable,
  deleteTable
}