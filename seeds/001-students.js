
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'person1', cohort_id: 1},
        { name: 'person2', cohort_id: 1},
        { name: 'person3', cohort_id: 1}
      ]);
    });
};
