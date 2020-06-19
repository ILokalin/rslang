import { ServerAPI } from '../ServerAPI';
import LocalStorageMock from './LocalStorageMock';

global.fetch = require('node-fetch');

global.localStorage = new LocalStorageMock();
const serverAPI = new ServerAPI();
const testUser = {
  email: 'pufic@test.ru',
  password: 'puficTest_1',
};

const testUserName = 'Test Petrovich';

describe('ServerAPI test', () => {
  it('Helper checkToken work with LocalStorage', () => {
    expect(serverAPI.checkToken()).toBe(false);
  });

  it('Helper checkToken return true with token', () => {
    localStorage.setItem('userId', 'id');
    localStorage.setItem('token', 'token');

    expect(serverAPI.checkToken()).toBe(true);
  });

  it('Helper packError repack error status to error.message', () => {
    const testStatus = {
      status: 200,
      statusText: 'ok',
    };

    const checkStatus = {
      status: 200,
      message: 'ok',
    };

    expect(serverAPI.packError(testStatus)).toEqual(checkStatus);
  });

  it('apiUserSignIn', async () => {
    await expect(serverAPI.apiUserSignIn(testUser)).resolves.toEqual(
      expect.objectContaining({
        message: expect.stringContaining('Authenticated'),
        token: expect.any(String),
        userId: expect.any(String),
      }),
    );
  });

  it('apiUserSettingsPut make write name to field "optional"', async () => {
    await expect(
      serverAPI.apiUserSettingsPut({
        optional: {
          name: testUserName,
        },
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(String),
        optional: {
          name: expect.stringContaining(testUserName),
        },
      }),
    );
  });

  it('apiUserSettingsGet load user data - name from field "optional"', async () => {
    await expect(
      serverAPI.apiUserSettingsGet({
        optional: {
          name: testUserName,
        },
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(String),
        optional: {
          name: expect.stringContaining(testUserName),
        },
      }),
    );
  });

  // it's commented because this test work alone only... this situation is very profound but not coincidental
  // it('apiUserCreate doesn\'t create a new user with existing email', async () => {
  //   await expect(serverAPI.apiUserCreate(testUser)).rejects.toEqual(
  //     expect.objectContaining({
  //       message: expect.stringContaining('Expectation Failed'),
  //     }),
  //   );
  // });
});
