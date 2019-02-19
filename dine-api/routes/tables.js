const express = require('express');
const passport = require('passport');
const api = require('../api/api');
const roles = require('../enum/roles');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/tables', async (req, res, next) => {
  try {
    switch(req.user.role) {
      case roles.Restaurant:
        return res.json(await api.getTablesForRestaurant(req.user))
      case roles.Customer:
        return res.json(await api.getAllTables())
      default:
        return next(new Error('Unauthorised'))
    }
  } catch (e) { return next(e); }
});

router.get('/table', async (req, res, next) => {
  if (req.user.role !== roles.Customer) return next(new Error('Unauthorised'));
  try {
    return res.json(await api.getTableForCustomer(req.user));
  } catch (e) { return next(e); }
});

router.get('/table/:tableId', async (req, res, next) => {
  if (req.user.role !== roles.Restaurant) return next(new Error('Unauthorised'));
  try {
    return res.json(await api.getTableById(req.user, req.params.tableId));
  } catch (e) { return next(e); }
});

// create
router.post('/table', async (req, res, next) => {
  if (req.user.role !== roles.Restaurant) return next(new Error('Unauthorised'));
  try {
    // Should use validation to assert body is correct format
    const createdTable = await api.createTable(req.user, req.body);
    res.json(createdTable);
  } catch (e) { return next(e); }
});

// update
router.put('/table/:tableId', async (req, res, next) => {
  try {
    return res.json(await api.updateTable(req.user, req.params.tableId, req.body));
  } catch (e) { return next(e); }
});

router.put('/rate', async (req, res, next) => {
  if (req.user.role !== roles.Customer) return next(new Error('Unauthorised'));
  try {
    return res.json(await api.rateTable(req.user, req.body));
  } catch (e) { return next(e); }
})

router.delete('/table/:tableId', async (req, res, next) => {
  try {
    const { user, params: { tableId } } = req;
    await api.deleteTable(user, tableId);
    res.end();
  } catch (e) { return next(e); }
});

module.exports = router;
