'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Movies', [
      {
        id: '501',
        name: 'Batman',
        createdAt: "2020-07-20 11:13:56",
        updatedAt: "2020-07-20 11:13:56"
      },
      {
        id: '502',
        name: 'Iron Man',
        createdAt: "2020-07-20 11:13:56",
        updatedAt: "2020-07-20 11:13:56"
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
