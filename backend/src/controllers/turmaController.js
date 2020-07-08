const connection = require('../configs/connection');


module.exports = {
    async list(req, res) {

        await connection('turma').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async listPorSerie(req, res) {
        const { serie_id } = req.params;

        await connection('turma').select('*').where('serie_id', serie_id || 0).first().then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async create(req, res) {
        const { nome, ano, serie_id } = req.body;

        await connection('turma').insert({
            nome, ano, serie_id
        }).then(result => {
            return res.status(200).json(result);
        }).catch(erro => {
            return res.status(500).json(erro);
        });
    }
}

