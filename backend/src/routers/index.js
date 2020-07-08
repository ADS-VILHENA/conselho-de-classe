const express = require('express');
const Routers = express.Router();

const cursoController = require('../controllers/cursoController');
const serieController = require('../controllers/serieController');
const turmaController = require('../controllers/turmaController');
const disciplinaController = require('../controllers/disciplinaController');
const alunoController = require('../controllers/alunoController');
const matriculaController = require('../controllers/matriculaController');
const periodoController = require('../controllers/periodoController');

const perfilTurmaController = require('../controllers/perfilTurmaController');
const indiceController = require('../controllers/indiceController');
const diagnosticoController = require('../controllers/diagnosticoController');


Routers.get('/diagnostico/turma', diagnosticoController.listTurma);
Routers.get('/diagnostico/turma/periodo/:idPeriodo', diagnosticoController.listPorPeriodo)
Routers.post('/diagnostico/turma', diagnosticoController.createTurma);

Routers.get('/diagnostico/aluno', diagnosticoController.listAluno);
Routers.post('/diagnostico/aluno', diagnosticoController.createAluno);
Routers.get('/diagnostico/aluno/serie', diagnosticoController.listPorAluno)
Routers.get('/diagnostico/serie', diagnosticoController.listPorSerie)

Routers.get('/indice', indiceController.list);
Routers.post('/indice', indiceController.create);

Routers.get('/curso', cursoController.list);
Routers.post('/curso', cursoController.create);

Routers.get('/serie', serieController.list);
Routers.post('/serie', serieController.create);
Routers.get('/serie/curso/:curso_id', serieController.listPorCurso)

Routers.get('/turma', turmaController.list);
Routers.post('/turma', turmaController.create);
Routers.get('/turma/serie/:serie_id', turmaController.listPorSerie);

Routers.get('/disciplina', disciplinaController.list);
Routers.post('/disciplina', disciplinaController.create);
Routers.get('/disciplina/serie/:serie_id', disciplinaController.listPorSerie);

Routers.get('/aluno', alunoController.list);
Routers.post('/aluno', alunoController.create);
Routers.get('/aluno/serie/:serie_id', alunoController.listNotasSerie);
Routers.get('/aluno/disciplina', alunoController.listNotasDisciplina);

Routers.get('/matricula', matriculaController.list);
Routers.post('/matricula', matriculaController.create);
Routers.get('/matricula/disciplina/:disciplina_id', matriculaController.listPorDisciplina);

Routers.get('/periodo', periodoController.list);
Routers.post('/periodo', periodoController.create);
Routers.get('/periodo/serie/:serie_id', periodoController.listPorSerie)

Routers.get('/perfil_turma', perfilTurmaController.list);


module.exports = Routers;