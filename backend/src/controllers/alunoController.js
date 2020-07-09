const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('aluno').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async listNotasSerie(req, res) {
        const { serie_id } = req.params;
        
        await connection.raw(`select aluno.id,aluno.nome as NomeAluno,notas.nota,periodo.nome as PeriodoNome from aluno
        JOIN matricula on aluno.id = matricula.aluno_id
        join disciplina on disciplina.id = matricula.disciplina_id
        join serie on serie.id = disciplina.serie_id
        join notas on notas.matricula_id = matricula.id
        join periodo on periodo.id = notas.periodo_id        
        WHERE serie.id = ${serie_id}`)
        .then(result => {
            let alunos = [];
            result.map( aluno => {
                let index = alunos.findIndex( e => e.id == aluno.id)
                if ( index == -1){
                    alunos.push({
                        id: aluno.id,
                        nome: aluno.NomeAluno,
                        notas:[aluno.nota]
                    })
                }else{
                    alunos[index].notas.push(aluno.nota)
                }
            })
            return res.status(200).json(alunos);
        }).catch(error => {
            return res.status(500).json(error);
        });

    },

    async listNotasDisciplina(req, res) {
        const { idDisciplina, idAluno } = req.query;
        
        await connection.raw(`select aluno.id,aluno.nome as NomeAluno,notas.nota,periodo.nome as PeriodoNome from aluno
        JOIN matricula on aluno.id = matricula.aluno_id
        join disciplina on disciplina.id = matricula.disciplina_id
        join serie on serie.id = disciplina.serie_id
        join notas on notas.matricula_id = matricula.id
        join periodo on periodo.id = notas.periodo_id        
        WHERE disciplina.id = ${idDisciplina} and
        aluno.id = ${idAluno}`)
        .then(result => {
            console.log(result)
            let alunos = [];
            result.map( aluno => {
                let index = alunos.findIndex( e => e.id == aluno.idAluno)
                if ( index == -1){
                    alunos.push({
                        id: aluno.id,
                        nome: aluno.NomeAluno,
                        notas:[aluno.nota]
                    })
                }else{
                    alunos[index].notas.push(aluno.nota)
                }
            })
            return res.status(200).json(alunos[0]);
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