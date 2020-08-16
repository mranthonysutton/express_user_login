// password123
const hashedPassword =
  '$2a$12$3tkn15IgKBdrGEgEalEZVeBIgerSmWbQ1iO9YAT0H128MlGPH/vlW';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email: 'test@test.com', password: hashedPassword },
      ]);
    });
};
