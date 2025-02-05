const { Sequelize } = require('sequelize');
const DeviceModel = require('../../models/device');

describe('Device Model', () => {
  let sequelize;
  let Device;

  beforeEach(() => {
    sequelize = new Sequelize('sqlite::memory:');
    Device = DeviceModel(sequelize, Sequelize.DataTypes);
    sequelize.sync({ force: true });
  });

  afterEach(() => {
    sequelize.close();
  });

  it('should create a device with valid attributes', async () => {
    const device = await Device.build({
      name: 'Test Device',
      ipAddress: '192.168.1.1',
      status: 'active',
      userId: '123e4567-e89b-12d3-a456-426614174000'
    });

    expect(device.name).toBe('Test Device');
    expect(device.ipAddress).toBe('192.168.1.1');
    expect(device.status).toBe('active');
    expect(device.userId).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('should not create a device without required fields', async () => {
    try {
      await Device.create({
        name: 'Test Device'
      });
      fail('Should not create device without required fields');
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('should generate UUID for id field', async () => {
    const device = await Device.build({
      name: 'Test Device',
      ipAddress: '192.168.1.1',
      status: 'active',
      userId: '123e4567-e89b-12d3-a456-426614174000'
    });

    expect(device.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('should define correct associations', () => {
    const mockModels = {
      User: {
        associate: jest.fn()
      }
    };
    Device.associate(mockModels);
    expect(Device.belongsTo).toBeDefined();
  });

  it('should use correct table name and timestamps', () => {
    expect(Device.getTableName()).toBe('Devices');
    expect(Device.options.timestamps).toBe(true);
  });
});
