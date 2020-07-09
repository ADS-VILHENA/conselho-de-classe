const connection = require('../configs/connection');

module.exports = {
    async listAluno(req, res) {

        await connection('diagnostico_aluno').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async listPorAluno(req, res) {
        const { idAluno, idSerie } = req.query;

        await connection
        .raw(`select diagnostico_aluno.id as idDiagnostico,diagnostico_aluno.idAluno as idAluno,
        diagnostico_aluno.idPeriodo as idPeriodo,indice.classe,indice.idIndice as idIndice,
         indice.descricao as descricaoIndice
        from diagnostico_aluno
        join indice on indice.idIndice = diagnostico_aluno.idIndice
        join periodo on periodo.id = diagnostico_aluno.idPeriodo
        join serie on  serie.id = periodo.serie_id
        join turma on turma.serie_id = serie.id
        where diagnostico_aluno.idAluno = ${idAluno}
        and serie.id = ${idSerie}`)
        
        .then(result => {
            console.log(result)
            let diagnosticos = [];
            result.map( diagnostico => {
                let index = diagnosticos.findIndex( e => e.id == diagnostico.idAluno)
                if ( index == -1){
                    diagnosticos.push({
                        id: diagnostico.idDiagnostico,
                        idAluno: diagnostico.idAluno,
                        periodo: diagnostico.idPeriodo,
                        indice : [{
                            classe: diagnostico.classe,
                            id: diagnostico.idIndice,
                            desc: diagnostico.descricaoIndice
                        }]
                    })
                }else{
                    diagnosticos[index].indice.push({
                        classe: diagnostico.classe,
                        id: diagnostico.idIndice,
                        desc: diagnostico.descricaoIndice
                    })
                }
            })
            return res.status(200).json(diagnosticos);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async listPorSerie(req, res) {
        const { idSerie } = req.query;

        await connection
        .raw(`select diagnostico_aluno.id as idDiagnostico,diagnostico_aluno.idAluno as idAluno,
        diagnostico_aluno.idPeriodo as idPeriodo,indice.classe,indice.idIndice as idIndice,
         indice.descricao as descricaoIndice, aluno.nome as nomeAluno
        from diagnostico_aluno
        join indice on indice.idIndice = diagnostico_aluno.idIndice
        join periodo on periodo.id = diagnostico_aluno.idPeriodo
        join serie on  serie.id = periodo.serie_id
        join turma on turma.serie_id = serie.id
        join aluno on aluno.id = diagnostico_aluno.idAluno
        where serie.id = ${idSerie}`)
        
        .then(result => {
            console.log(result)
            let diagnosticos = [];
            result.map( diagnostico => {
                let index = diagnosticos.findIndex( e => e.id == diagnostico.id)
                if ( index == -1){
                    diagnosticos.push({
                        
                        idAluno: diagnostico.idAluno,
                        nomeAluno: diagnostico.nomeAluno,
                        periodo: diagnostico.idPeriodo,
                        indice : [{
                            classe: diagnostico.classe,
                            id: diagnostico.idIndice,
                            desc: diagnostico.descricaoIndice
                        }]
                    })
                }else{
                    diagnosticos[index].indice.push({
                        classe: diagnostico.classe,
                        id: diagnostico.idIndice,
                        desc: diagnostico.descricaoIndice
                    })
                }
            })
            return res.status(200).json(diagnosticos);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async listPorPeriodo(req, res) {
        const { idPeriodo } = req.params;

        await connection('diagnostico_aluno').select('*').where('idPeriodo', idPeriodo || 0).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async createAluno(req, res) {

        const { idAluno, idIndice, idPeriodo } = req.body;

        await connection('diagnostico_aluno').insert({
            idAluno,
            idIndice,
            idPeriodo
        }).then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },


//////////////Turma

    async listTurma(req, res) {

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

    async createTurma(req, res) {

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
