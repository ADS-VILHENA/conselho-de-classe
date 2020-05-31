const connection = require('../configs/connection');

module.exports = {
    async list(req, res){

        await connection('curso').select('*').then( result => {
            return res.status(200).json(result);
        }).catch( error => {
            return res.status(500).json(error);
        });     

    },
    async create(req, res){

        const { nome, nivel } = req.body;

        await connection('curso').insert({
            nome,
             nivel
        }).then( result => {
            return res.status(200).json(result);  
        }).catch( erro => {
            return res.status(500).json(erro);
        });
        
    }
}