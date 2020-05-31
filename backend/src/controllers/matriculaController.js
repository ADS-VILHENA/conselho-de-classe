const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('matricula').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async listPorDisciplina(req, res) {
        const { disciplina_id } = req.params;

        await connection('matricula').select('*').where('disciplina_id', disciplina_id || 0).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async create(req, res) {
        const { data, disciplina_id, aluno_id } = req.body;

        await connection('matricula').insert({
            data,
            disciplina_id,
            aluno_id
        }).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }
}