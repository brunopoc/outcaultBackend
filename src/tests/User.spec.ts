const UserService = require('@services/UserService');

const databaseName = 'user-test';
const { setupDB } = require('./testSetup');

require('@models/UserModel');

describe('testing UserService', () => {
  setupDB(databaseName);
  it('it should record an new user and login with it', async () => {
    const recordNewUser = {
      email: 'bruno.poc@gmail.com',
      name: 'Bruno Pereira Ornelas Cabral',
      password: '123456',
      nickname: 'sirbrunocabral',
    };

    const userRecordedData = await UserService.singup(recordNewUser);

    expect(userRecordedData.status).toEqual('created');
    expect(userRecordedData.data.email).toEqual('bruno.poc@gmail.com');
    expect(userRecordedData.data.type).toEqual('user');

    const loginUser = {
      email: 'bruno.poc@gmail.com',
      password: '123456',
    };

    const userLoginData = await UserService.singin(loginUser);

    expect(userLoginData.data.email).toEqual('bruno.poc@gmail.com');
  });
});
