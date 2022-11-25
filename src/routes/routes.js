const express = require('express');

const routes = express.Router();

const Usuario = require('../controllers/usuarios.controllers')

routes.get('/', Usuario.index);

routes.post('/api/cadastro', Usuario.create);
routes.get('/api/cadastro', Usuario.index);
routes.get('/api/details/:_id', Usuario.detalhes);
routes.delete('/api/cadastro/:_id', Usuario.delete);
routes.patch('/api/cadastro/:_id', Usuario.update);



module.exports = routes;
