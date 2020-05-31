const express = require('express');
const Routers = express.Router();

const cursoController = require('../controllers/cursoController');
const serieController = require('../controllers/serieController');


Routers.get('/curso', cursoController.list);
Routers.post('/curso', cursoController.create);

Routers.get('/serie', serieController.list);
Routers.post('/serie', serieController.create);
Routers.get('/serie/:curso_id', serieController.listPorCurso)

module.exports = Routers;