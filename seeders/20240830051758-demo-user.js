'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        user_password: hashedPassword,
        phone_number: '1234567890',
        position: 'Developer',
        is_login: true,
        is_verified: true,
        companyId: 1, // Assuming this user belongs to company with ID 1
        user_roles: 'administration',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        user_password: hashedPassword,
        phone_number: '0987654321',
        position: 'Manager',
        is_login: true,
        is_verified: true,
        companyId: 2, // Assuming this user belongs to company with ID 2
        user_roles: 'decision maker',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
