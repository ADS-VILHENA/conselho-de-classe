const express = require('express');
const Routers = express.Router();

const cursoController = require('../controllers/cursoController');

Routers.get('/curso', cursoController.list);
Routers.post('/curso', cursoController.create);

module.exports = Routers;