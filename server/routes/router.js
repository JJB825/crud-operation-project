const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// this is to render pages when specified buttons are clicked due to which certain get requests are made

/**
 * @description Root Route
 * @method GET /home
 */
route.get('/', services.homeRoute);

/**
 * @description add users
 * @method GET /add-user
 */
route.get('/add-user', services.add_user);

/**
 * @description update user information
 * @method GET /update-user
 */
route.get('/update-user', services.update_user);

// handing API requests

// '/api/users' is route path of post request
// create user
route.post('/api/users', controller.create);

// find user/s
route.get('/api/users', controller.find);

// update user
route.put('/api/users/:id', controller.update);

// delete user
route.delete('/api/users/:id', controller.delete);

module.exports = route;
