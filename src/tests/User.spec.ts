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

  it('it should not find a user in check', async () => {
    const userInfo = {
      email: 'bruno.poc@gmail.com',
    };

    const userRecordedData = await UserService.alreadyInBase(userInfo);

    expect(userRecordedData.status).toEqual('notIn');
  });

  it('it should record a new user and find him in check', async () => {
    const recordNewUser = {
      email: 'teste@teste.com',
      name: 'Bruno Pereira Ornelas Cabral',
      password: '123456',
      nickname: 'sirbrunocabral',
    };

    const userRecordedDataLogin = await UserService.singup(recordNewUser);

    expect(userRecordedDataLogin.status).toEqual('created');
    expect(userRecordedDataLogin.data.email).toEqual('bruno.poc@gmail.com');
    expect(userRecordedDataLogin.data.type).toEqual('user');

    const userInfo = {
      email: 'bruno.poc@gmail.com',
    };

    const userRecordedData = await UserService.alreadyInBase(userInfo);

    expect(userRecordedData.status).toEqual('in');
  });
});
