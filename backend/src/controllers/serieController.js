const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('serie').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async listPorCurso(req, res) {
        const { curso_id } = req.params;

        await connection('serie').select('*').where('curso_id', curso_id || 0).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async create(req, res) {

        const { nome, curso_id } = req.body;

        await connection('serie').insert({
            nome, curso_id
        }).then(result => {
            return res.status(200).json(result);
        }).catch(erro => {
            return res.status(500).json(erro);
        });

    }
}