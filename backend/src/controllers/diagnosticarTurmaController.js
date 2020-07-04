const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('diagnosticar_turma').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async listPorPeriodo(req, res) {
        const { idPeriodo } = req.params;

        await connection('diagnosticar_turma').select('*').where('idPeriodo', idPeriodo || 0).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async create(req, res) {

        const { idPerfil_turma, idPeriodo } = req.body;

        await connection('diagnosticar_turma').insert({
            idPerfil_turma,
            idPeriodo
        }).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }
}