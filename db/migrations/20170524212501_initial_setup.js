
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('name');
      table.string('username');
      table.string('password');
      table.string('email');
      table.string('avatar');
      table.integer('rating');
    }),

    knex.schema.createTable('friends', function(table){
      table.integer('user1_id').references('users.id');
      table.integer('user2_id').references('users.id');
      table.primary(['user1_id', 'user2_id']);
    }),

    knex.schema.createTable('game_archives', function(table){
      table.increments('id');
      table.integer('user1_id').references('users.id');
      table.integer('user2_id').references('users.id');
      table.date('date');
      table.integer('winner_id').references('users.id');
    }),

    knex.schema.createTable('chats', function(table){
      table.increments('id');
      table.integer('user_id').references('users.id');
      table.string('channel');
      table.string('message');
    }),

    knex.schema.createTable('decks', function(table){
      table.increments('id');
      table.integer('user_id').references('users.id');
    }),

    knex.schema.createTable('cards', function(table){
      table.increments('id');
      table.string('name');
      table.string('type');
    }),

    knex.schema.createTable('deck_cards', function(table){
      table.integer('slot');
      table.integer('deck_id').references('decks.id');
      table.integer('card_id').references('cards.id');
      table.primary(['slot', 'deck_id']);
    }),

    knex.schema.createTable('creatures', function(table){
      table.integer('card_id').references('cards.id').primary();
      table.integer('front_power');
      table.integer('side_power');
      table.string('type');
    }),

    knex.schema.createTable('effects', function(table){
      table.integer('card_id').references('cards.id').primary();
      table.string('function_name');
      table.string('value');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.string('name');
      table.dropColumn('username');
      table.dropColumn('password');
      table.dropColumn('email');
      table.dropColumn('avatar');
      table.dropColumn('rating');
    }),

    knex.schema.dropTable('friends'),
    knex.schema.dropTable('game_archives'),
    knex.schema.dropTable('chats'),
    knex.schema.dropTable('decks'),
    knex.schema.dropTable('deck_cards'),
    knex.schema.dropTable('cards'),
    knex.schema.dropTable('creatures'),
    knex.schema.dropTable('effects'),
  ]);
};
