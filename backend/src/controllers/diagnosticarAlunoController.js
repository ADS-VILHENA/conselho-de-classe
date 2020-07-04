const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('diagnosticar_aluno').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },
    async listPorPeriodo(req, res) {
        const { idPeriodo } = req.params;

        await connection('diagnosticar_aluno').select('*').where('idPeriodo', idPeriodo || 0).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async create(req, res) {

        const { idAluno, idIndice, idPeriodo } = req.body;

        await connection('diagnosticar_aluno').insert({
            idAluno,
            idIndice,
            idPeriodo
        }).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }
}