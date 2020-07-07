const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('periodo').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async listPorCurso(req, res) {
        const { curso_id } = req.params;

        await connection('periodo').join('serie','periodo.serie_id','=','serie.id')
        .select('*').where('serie.curso_id', curso_id || 0).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },


    async create(req, res) {
        const { nome, serie_id } = req.body;

        await connection('periodo').insert({
            nome, serie_id
        }).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }
}