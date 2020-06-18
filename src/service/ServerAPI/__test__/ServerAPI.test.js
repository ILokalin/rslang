import { ServerAPI } from '../ServerAPI';
import LocalStorageMock from './LocalStorageMock';

const apiUserGetAnswer = {
  "wordsPerDay": 0,
  "optional": {}
}

const serverAPI = new ServerAPI;
global.localStorage = new LocalStorageMock;
// global.fetch = jest.fn(() => Promise.resolve({
//   json: () => Promise.resolve(apiUserGetAnswer)
// }))

const testUser = {
  name: 'Test Petrovich',
  email: 'test.petro@test.ru',
  password: 'testNo#1'
}

describe('ServerAPI test', () => {
  it('Helper checkToken work with LocalStorage', () => {
    expect(serverAPI.checkToken()).toBe(false);
  })

  it('Helper checkToken return true with token', () => {
    localStorage.setItem('userId', 'id');
    localStorage.setItem('token', 'token');

    expect(serverAPI.checkToken()).toBe(true);
  })

  it('Helper packError repack error status to error.message', () => {
    const testStatus = {
      status: 200,
      statusText: 'ok'
    }

    const checkStatus = {
      status: 200,
      message: 'ok'
    }

    expect(serverAPI.packError(testStatus)).toEqual(checkStatus);
  })

  it('apiUserCreate create new user', () => {
    expect(serverAPI.apiUserCreate(testUser)).resolves.toEqual(expect.objectContaining({
      email: expect.stringContaining(testUser.email),
      id: expect.any(String)
    }));
  })




  // it('apiUserSettingsGet load user data', () => {
  //   expect(serverAPI.checkToken()).toBe(true);
  // })


})
