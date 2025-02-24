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
    return queryInterface.bulkInsert('Blogs', [
      {
        authorId: 1,
        title: "Postgre Mantap",
        image: "/img/blog-img1.jpg",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 1,
        title: "MariaDB Ajib",
        image: "/img/coding.jpg",
        content: "consectetur adipisicing elit. Quisquam, voluptatum. Welcome Home",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 2,
        title: "Bootstrap Very Good",
        image: "/img/blog-img1.jpg",
        content: "Welcome to the jungle, adios and super.",
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
    return queryInterface.bulkDelete('Blogs', null, {});
  }
};
