const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('aluno').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async create(req, res) {

        const { nome, cpf } = req.body;

        await connection('aluno').insert({
            nome,
            cpf
        }).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    }
}