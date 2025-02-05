'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Devices" DROP CONSTRAINT IF EXISTS Devices_userId_fkey;
      ALTER TABLE "users" DROP CONSTRAINT IF EXISTS users_pkey;
      ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE UUID USING (gen_random_uuid());
      ALTER TABLE "users" ADD PRIMARY KEY ("id");
      ALTER TABLE "Devices"
      ADD CONSTRAINT Devices_userId_fkey 
      FOREIGN KEY ("userId") 
      REFERENCES "users" ("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Devices" DROP CONSTRAINT IF EXISTS Devices_userId_fkey;
      ALTER TABLE "users" DROP CONSTRAINT IF EXISTS users_pkey;
      ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE INTEGER;
      ALTER TABLE "users" ADD PRIMARY KEY ("id");
      ALTER TABLE "Devices"
      ADD CONSTRAINT Devices_userId_fkey 
      FOREIGN KEY ("userId") 
      REFERENCES "users" ("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
    `);
  }
};