
exports.up = function(knex) {
  return knex.schema.table('serie', (table) => {
    table.dropColumn('ano');
  })
};

exports.down = function(knex) {
  
};
