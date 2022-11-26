const express = require('express');

const routes = express.Router();

const User = require('../controllers/usersControllers')

routes.post('/api/register', User.create);
routes.get('/api/register', User.index);
routes.get('/api/details/:_id', User.details);
routes.patch('/api/register/:_id', User.update);
routes.delete('/api/register/:_id', User.delete);


module.exports = routes;