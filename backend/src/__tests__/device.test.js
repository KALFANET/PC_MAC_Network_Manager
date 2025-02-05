const { Sequelize, DataTypes } = require('sequelize');
const request = require('supertest');
const path = require('path');
const app = require('../app'); 
const DeviceModel = require('../models/device');

let sequelize;
let Device;

beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', {
        dialect: 'sqlite',
        logging: false
    });

    Device = DeviceModel(sequelize, DataTypes);
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    if (sequelize) {
        await sequelize.close();
    }
});

describe('Devices API', () => {
  it('should create a device', async () => {
    const res = await request(app)
      .post('/api/devices')
      .send({
        name: "Test Device",
        ipAddress: "192.168.1.1",
        status: "online",
        userId: "6946ef78-7975-4edb-ac0f-2690ef0dd9e3"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.device).toHaveProperty('id');
});
});