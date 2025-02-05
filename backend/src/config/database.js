const { Sequelize } = require('sequelize');
const dbConfig = require('./config'); // טעינת ההגדרות


const sequelize = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {
        host: dbConfig.development.host,
        dialect: dbConfig.development.dialect,
        port: dbConfig.development.port,
        dialectOptions: dbConfig.development.dialectOptions,
        logging: dbConfig.development.logging
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ החיבור למסד הנתונים הצליח!');
    } catch (error) {
        console.error('❌ שגיאה בחיבור למסד הנתונים:', error.message);
    }
})();

module.exports = sequelize;