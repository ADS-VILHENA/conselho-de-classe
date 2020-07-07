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
const diagnosticarTurmaController = require('../controllers/diagnosticarTurmaController');
const diagnosticarAlunoController = require('../controllers/diagnosticarAlunoController');

Routers.get('/diagnosticar_turma', diagnosticarTurmaController.list);
Routers.get('/diagnosticar_turma/:idPeriodo', diagnosticarTurmaController.listPorPeriodo)
Routers.post('/diagnosticar_turma', diagnosticarTurmaController.create);

Routers.get('/diagnostico_aluno', diagnosticarAlunoController.list);
Routers.post('/diagnostico_aluno', diagnosticarAlunoController.create);
// Routers.get('/diagnosticar_aluno/:idPeriodo', diagnosticarAlunoController.listPorPeriodo)
Routers.get('/diagnostico_aluno/', diagnosticarAlunoController.listPorAluno)

Routers.get('/indice', indiceController.list);
Routers.post('/indice', indiceController.create);

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

Routers.get('/aluno', alunoController.list);
Routers.post('/aluno', alunoController.create);
Routers.get('/aluno/:curso_id', alunoController.listNotas);


Routers.get('/matricula', matriculaController.list);
Routers.post('/matricula', matriculaController.create);
Routers.get('/matricula/:disciplina_id', matriculaController.listPorDisciplina);

Routers.get('/periodo', periodoController.list);
Routers.post('/periodo', periodoController.create);
Routers.get('/periodo/:curso_id', periodoController.listPorCurso)

Routers.get('/perfil_turma', perfilTurmaController.list);


module.exports = Routers;