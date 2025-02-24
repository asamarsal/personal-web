'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Asa Marsal',
        email: 'asamarsal@example.com',
        password: 'qwerty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ujang Udin',
        email: 'ujang@gmail.com',
        password: 'zxcvbn',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Suka Tani',
        email: 'sukatani@gmail.com',
        password: 'asdfg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
