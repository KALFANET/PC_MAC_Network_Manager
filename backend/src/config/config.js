require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    migrations: {
      directory: path.resolve(__dirname, "../migrations") // 👈 עדכון הנתיב הנכון למיגרציות
    },
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST || 'test_db',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    migrationStorageTableName: "sequelize_meta",
    migrations: {
      directory: path.resolve(__dirname, "../migrations") // 👈 עדכון הנתיב הנכון למיגרציות
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    migrationStorageTableName: "sequelize_meta",
    migrations: {
      directory: path.resolve(__dirname, "../migrations") // 👈 עדכון הנתיב הנכון למיגרציות
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
};