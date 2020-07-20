'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserMovies', [
      {
        id: '1',
        userId: 1,
        movieId: '501',
        createdAt: "2020-07-20 11:13:56",
        updatedAt: "2020-07-20 11:13:56"
      },
      {
        id: '1',
        userId: 2,
        movieId: '502',
        createdAt: "2020-07-20 11:13:56",
        updatedAt: "2020-07-20 11:13:56"
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserMovies', null, {});
  },
};
