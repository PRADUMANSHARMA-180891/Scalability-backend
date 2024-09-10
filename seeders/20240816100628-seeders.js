'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'prady7119@gmail.com',
        user_password: '$2b$10$i07gNaICR7kJSdhL6wap6uuWa21S/Ij4rnur21YvlbaV7MUj5wO56',
        user_photo: 'https://example.com/photo.jpg',
        phone_number: '1234567890',
        p_isd: '+1',
        whatsapp_no: '1234567890',
        w_isd: '+1',
        otp: '123456',
        position: 'Developer',
        is_login: false,
        is_verified: true,
        company_id: 1,
        departments_id: 1,
        status: 1,
        remember_token: null,
        user_roles: 'administration',
        department: 'IT',
        notes: 'Some notes here',
        twitter_url: 'https://twitter.com/johndoe',
        linkedin_url: 'https://linkedin.com/in/johndoe',
        date_of_birth: '1990-01-01',
        hire_date: '2020-01-01',
        hobbies: 'Coding, Music',
        D: 10,
        I: 20,
        S: 30,
        C: 40,
        D2: 50,
        I2: 60,
        S2: 70,
        C2: 80,
        assignTaskAlert: true,
        taskDueTodayAlert: true,
        changeDueDateAlert: false,
        completeTaskAlert: true,
        stuckAlert: false,
        unstuckAlert: true,
        weeklyAlert: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // More user entries can be added here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
