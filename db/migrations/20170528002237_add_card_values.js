
exports.up = function(knex, Promise) {
  return knex.schema.table('creatures', function (table) {
    table.integer('value');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('creatures', function(table){
    table.dropColumn('value');
  });
};
