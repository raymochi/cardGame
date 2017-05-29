exports.seed = function(knex, Promise) {
  return knex('deck_cards').del()
    .then(function () {
      return knex('effects').del()
    })
    .then(function () {
      return knex('creatures').del()
    })
    .then(function () {
      return knex('cards').del()
    })
    .then(function () {
      return knex('decks').del()
    })
    .then(function () {
      return knex('chats').del()
    })
    .then(function () {
      return knex('game_archives').del()
    })
    .then(function () {
      return knex('friends').del()
    })
    .then(function () {
      return knex('users').del()
    })

  .then(function () {
    return Promise.all([
      knex('users').insert({ id: 1, username: 'Armel', password: 'fake', email: 'fake1@test.com', avatar: 'https://image.flaticon.com/icons/png/128/126/126486.png', rating: 1500, rating_deviation: 200, volatility: 0.06}),
      knex('users').insert({ id: 2, username: 'Raymond', password: 'fake', email: 'fake2@test.com', avatar: 'https://image.flaticon.com/icons/png/128/126/126486.png', rating: 1500, rating_deviation: 200, volatility: 0.06}),
      knex('users').insert({ id: 3, username: 'Juan', password: 'fake', email: 'fake3@test.com', avatar: 'https://image.flaticon.com/icons/png/128/126/126486.png', rating: 1500, rating_deviation: 200, volatility: 0.06}),
    ]);
  })
  .then(function() {
    return Promise.all([
      knex('friends').insert({user1_id: 1, user2_id: 2}),
      knex('friends').insert({user1_id: 2, user2_id: 3}),
    ]);
  })
  .then(function() {
    return Promise.all([
      knex('game_archives').insert({user1_id: 1, user2_id: 2, date: new Date, winner_id: 2 }),
      knex('game_archives').insert({user1_id: 3, user2_id: 2, date: new Date, winner_id: 3 }),
    ]);
  })
  .then(function() {
    return Promise.all([
      knex('chats').insert({user_id: 1, channel: 'global', message: 'Hello World!' }),
      knex('chats').insert({user_id: 3, channel: 'global', message: 'Hello Chat!' }),
    ]);
  })
  .then(function() {
    return Promise.all([
      knex('decks').insert({id: 1, user_id: 1 }),
      knex('decks').insert({id: 2, user_id: 2 }),
      knex('decks').insert({id: 3, user_id: 3 }),

    ]);
  })
  .then(function() {
    return Promise.all([
      knex('cards').insert({ id: 1, name: 'Warlord', type: 'creature' }),
      knex('cards').insert({ id: 2, name: 'Knight', type: 'creature' }),
      knex('cards').insert({ id: 3, name: 'Soldier', type: 'creature' }),
      knex('cards').insert({ id: 4, name: 'Squire', type: 'creature' }),
      knex('cards').insert({ id: 5, name: 'Archmage', type: 'creature' }),
      knex('cards').insert({ id: 6, name: 'Mage', type: 'creature' }),
      knex('cards').insert({ id: 7, name: 'Scholar', type: 'creature' }),
      knex('cards').insert({ id: 8, name: 'Apprentice', type: 'creature' }),
      knex('cards').insert({ id: 9, name: 'Assassin', type: 'creature' }),
      knex('cards').insert({ id: 10, name: 'Archer', type: 'creature' }),
      knex('cards').insert({ id: 11, name: 'Rogue', type: 'creature' }),
      knex('cards').insert({ id: 12, name: 'Scout', type: 'creature' }),

    ]);
  })
  .then(function() {
    return Promise.all([
      knex('creatures').insert({card_id: 1, front_power: 4, side_power: 4, type: 'Rock', value: 0 }),
      knex('creatures').insert({card_id: 2, front_power: 3, side_power: 3, type: 'Rock', value: 1 }),
      knex('creatures').insert({card_id: 3, front_power: 2, side_power: 2, type: 'Rock', value: 2 }),
      knex('creatures').insert({card_id: 4, front_power: 1, side_power: 1, type: 'Rock', value: 3 }),
      knex('creatures').insert({card_id: 5, front_power: 5, side_power: 3, type: 'Paper', value: 0 }),
      knex('creatures').insert({card_id: 6, front_power: 4, side_power: 2, type: 'Paper', value: 1 }),
      knex('creatures').insert({card_id: 7, front_power: 3, side_power: 1, type: 'Paper', value: 2 }),
      knex('creatures').insert({card_id: 8, front_power: 2, side_power: 0, type: 'Paper', value: 3 }),
      knex('creatures').insert({card_id: 9, front_power: 3, side_power: 5, type: 'Scissors', value: 0 }),
      knex('creatures').insert({card_id: 10, front_power: 2, side_power: 4, type: 'Scissors', value: 1 }),
      knex('creatures').insert({card_id: 11, front_power: 1, side_power: 3, type: 'Scissors', value: 2 }),
      knex('creatures').insert({card_id: 12, front_power: 1, side_power: 2, type: 'Scissors', value: 3 }),
    ]);
  })
  .then(function() {
    return Promise.all([
      knex('effects').insert({card_id: 4, function_name: 'diesInXTurns', value: '3' }),
      knex('effects').insert({card_id: 8, function_name: 'powerAura', value: '-1' }),
      knex('effects').insert({card_id: 12, function_name: 'CannotPlaceOnRow', value: '3' }),
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('deck_cards').insert({slot: 1, deck_id: 1, card_id: 3 }),
      knex('deck_cards').insert({slot: 2, deck_id: 1, card_id: 3 }),
      knex('deck_cards').insert({slot: 3, deck_id: 1, card_id: 3 }),
      knex('deck_cards').insert({slot: 4, deck_id: 1, card_id: 3 }),
      knex('deck_cards').insert({slot: 5, deck_id: 1, card_id: 3 }),
      knex('deck_cards').insert({slot: 6, deck_id: 1, card_id: 7 }),
      knex('deck_cards').insert({slot: 7, deck_id: 1, card_id: 7 }),
      knex('deck_cards').insert({slot: 8, deck_id: 1, card_id: 7 }),
      knex('deck_cards').insert({slot: 9, deck_id: 1, card_id: 7 }),
      knex('deck_cards').insert({slot: 10, deck_id: 1, card_id: 7 }),
      knex('deck_cards').insert({slot: 11, deck_id: 1, card_id: 11 }),
      knex('deck_cards').insert({slot: 12, deck_id: 1, card_id: 11 }),
      knex('deck_cards').insert({slot: 13, deck_id: 1, card_id: 11 }),
      knex('deck_cards').insert({slot: 14, deck_id: 1, card_id: 11 }),
      knex('deck_cards').insert({slot: 15, deck_id: 1, card_id: 11 }),

      knex('deck_cards').insert({slot: 1, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 2, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 3, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 4, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 5, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 6, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 7, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 8, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 9, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 10, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 11, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 12, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 13, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 14, deck_id: 2, card_id: 7 }),
      knex('deck_cards').insert({slot: 15, deck_id: 2, card_id: 7 }),

      knex('deck_cards').insert({slot: 1, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 2, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 3, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 4, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 5, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 6, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 7, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 8, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 9, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 10, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 11, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 12, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 13, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 14, deck_id: 3, card_id: 11 }),
      knex('deck_cards').insert({slot: 15, deck_id: 3, card_id: 11 }),
    ]);
  });
}

