import { expect } from 'chai';
import { stub, spy } from 'sinon';
import faker from 'faker';

import UserController from '../../src/controllers/users.controller';

describe.skip('Test the users controller', () => {
  describe('Test create method', () => {
    let sendStatus, json, res, userController;

    beforeEach(() => {
      sendStatus = stub();
      json = spy();
      res = { json, sendStatus };
      sendStatus.returns(res);
    });

    it('It should create a new user', async () => {
      const req = {
        body: {
          name: faker.name.lastName,
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      };

      userController = new UserController();

      await userController.create(req, res);
    });
  });
});
