
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.integer('rating_deviation');
    table.decimal('volatility');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('rating_deviation');
    table.dropColumn('volatility');
  });
};
