exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'Armel', password: 'fake', email: 'fake1@test.com', avatar: 'https://image.flaticon.com/icons/png/128/126/126486.png', rating: '1000'}),
        knex('users').insert({id: 2, username: 'Raymond', password: 'fake', email: 'fake2@test.com', avatar: 'https://image.flaticon.com/icons/png/128/126/126486.png', rating: '1000'}),
        knex('users').insert({id: 3, username: 'Juan', password: 'fake', email: 'fake3@test.com', avatar: 'https://image.flaticon.com/icons/png/128/126/126486.png', rating: '1000'}),
      ]);
    });
};

// table.dropColumn('name');
//       table.string('username');
//       table.string('password');
//       table.string('email');
//       table.string('avatar');
//       table.integer('rating');
