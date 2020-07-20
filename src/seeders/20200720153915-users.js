'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'User Test1',
        email: 'test@mail.com',
        password: '12345667890',
        username: 'test1',
        createdAt: "2020-07-20 11:13:56",
        updatedAt: "2020-07-20 11:13:56"
      },
      {
        name: 'User Test2',
        email: 'test2@mail.com',
        password: '12345667890',
        username: 'test2',
        createdAt: "2020-07-20 11:13:56",
        updatedAt: "2020-07-20 11:13:56"
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
