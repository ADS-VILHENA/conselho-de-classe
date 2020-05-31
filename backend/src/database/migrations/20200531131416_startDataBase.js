
exports.up = function (knex) {
    return knex.schema.createTable('curso', (table) => {
        table.increments('id').primary().notNullable();
        table.string('nome').notNullable();
        table.string('nivel').notNullable();
    })
    .createTable('serie', (table) => {
        table.increments('id').primary().notNullable();
        table.string('nome').notNullable();
        table.string('ano').notNullable();
        table.string('curso_id').notNullable();
        table.foreign('curso_id').references('id').inTable('curso');
    })
    .createTable('turma', (table) => {
        table.increments('id').primary().notNullable();
        table.string('nome').notNullable();
        table.string('ano').notNullable();
        table.string('serie_id').notNullable();
        table.foreign('serie_id').references('id').inTable('serie');
    })
    .createTable('disciplina', (table) => {
        table.increments('id').primary().notNullable();
        table.string('nome').notNullable(); 
        table.string('serie_id').notNullable();
        table.foreign('serie_id').references('id').inTable('serie');
    })
    .createTable('periodo', (table) => {
        table.increments('id').primary().notNullable();
        table.string('nome').notNullable(); 
        table.string('serie_id').notNullable();
        table.foreign('serie_id').references('id').inTable('serie');
    })
    .createTable('aluno', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable(); 
        table.string('cpf').notNullable();  
    })
    .createTable('matricula', (table) => {
        table.increments('id').primary().notNullable();
        table.date('data').notNullable();
        table.string('disciplina_id').notNullable();
        table.string('aluno_id').notNullable();

        table.foreign('disciplina_id').references('id').inTable('disciplina');
        table.foreign('aluno_id').references('id').inTable('aluno');
    })
    .createTable('frequencia', (table) => {
        table.increments('id').primary().notNullable();
        table.date('data').notNullable();
        table.boolean('presente').defaultTo(0);
        table.string('matricula_id').notNullable();
        table.string('periodo_id').notNullable();
        
        table.foreign('matricula_id').references('id').inTable('matricula');
        table.foreign('periodo_id').references('id').inTable('periodo');
    })
    .createTable('notas', (table) => {
        table.increments('id').primary().notNullable();
        table.decimal('nota', 4, 2).defaultTo(0); 
        table.string('matricula_id').notNullable();
        table.string('periodo_id').notNullable();
        
        table.foreign('matricula_id').references('id').inTable('matricula');
        table.foreign('periodo_id').references('id').inTable('periodo');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('curso')
    .dropTable('serie')
    .dropTable('turma')
    .dropTable('disciplina')
    .dropTable('periodo')
    .dropTable('aluno')
    .dropTable('notas')
};  
