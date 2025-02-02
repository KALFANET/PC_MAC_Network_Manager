require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",
    migrationStoragePath: path.resolve(__dirname, "../migrations"),
    seederStorage: "sequelize",
    seederStorageTableName: "seeders",
    seederStoragePath: path.resolve(__dirname, "../seeders"),
    modelPaths: [path.resolve(__dirname, "../models")]
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST || 'test_db',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    migrationStoragePath: path.resolve(__dirname, "../migrations"),
    seederStoragePath: path.resolve(__dirname, "../seeders"),
    modelPaths: [path.resolve(__dirname, "../models")]
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    migrationStoragePath: path.resolve(__dirname, "../migrations"),
    seederStoragePath: path.resolve(__dirname, "../seeders"),
    modelPaths: [path.resolve(__dirname, "../models")]
  }
};