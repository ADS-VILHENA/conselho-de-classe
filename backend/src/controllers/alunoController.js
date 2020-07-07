const connection = require('../configs/connection');

module.exports = {
    async list(req, res) {

        await connection('aluno').select('*').then(result => {
            return res.status(200).json(result);
        }).catch(error => {
            return res.status(500).json(error);
        });
    },

    async listNotas(req, res) {
        const { curso_id } = req.params;
        
        await connection.raw(`select aluno.id,aluno.nome as NomeAluno,notas.nota,periodo.nome as PeriodoNome from aluno
        JOIN matricula on aluno.id = matricula.aluno_id
        join disciplina on disciplina.id = matricula.disciplina_id
        join serie on serie.id = disciplina.serie_id
        join notas on notas.matricula_id = matricula.id
        join periodo on periodo.id = notas.periodo_id        
        WHERE serie.curso_id = ${curso_id}`)
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