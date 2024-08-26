'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserInvites', [
      {
        email: 'john.doe@example.com',
        role: 'Admin',
        token: 'abc123token',
        accepted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane.smith@example.com',
        role: 'User',
        token: 'xyz456token',
        accepted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'alice.johnson@example.com',
        role: 'Moderator',
        token: 'def789token',
        accepted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'bob.brown@example.com',
        role: 'User',
        token: 'ghi012token',
        accepted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserInvites', null, {});
  }
};
