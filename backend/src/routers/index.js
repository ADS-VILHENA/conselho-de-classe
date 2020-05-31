const express = require('express');
const Routers = express.Router();

const cursoController = require('../controllers/cursoController');
const serieController = require('../controllers/serieController');
const turmaController = require('../controllers/turmaController');
const disciplinaController = require('../controllers/disciplinaController');

Routers.get('/curso', cursoController.list);
Routers.post('/curso', cursoController.create);

Routers.get('/serie', serieController.list);
Routers.post('/serie', serieController.create);
Routers.get('/serie/:curso_id', serieController.listPorCurso)

Routers.get('/turma', turmaController.list);
Routers.post('/turma', turmaController.create);
Routers.get('/turma/:serie_id', turmaController.listPorSerie);

Routers.get('/disciplina', disciplinaController.list);
Routers.post('/disciplina', disciplinaController.create);
Routers.get('/disciplina/:serie_id', disciplinaController.listPorSerie);


module.exports = Routers;