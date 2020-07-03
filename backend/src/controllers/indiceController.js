const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('indice').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async create(req, res) {

        const { id, descricao } = req.body;

        await connection('indice').insert({
            id,
            descricao
        }).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }
}