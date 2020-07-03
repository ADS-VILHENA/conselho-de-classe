const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('perfil_turma').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

}