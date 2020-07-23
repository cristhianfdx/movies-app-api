import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import UserService from '../../src/services/user.service';
import UserController from '../../src/controllers/users.controller';

describe('Test the users controller', () => {
  describe('create', () => {
    let status, json, res, userController, userService;

    const userStub = {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepository = sinon.spy();
      userService = new UserService(userRepository);
    });

    it('It should create a user when all the correct parameters are provided', async () => {
      const req = {
        body: {
          name: faker.name.findName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      };

      const stubCreate = sinon.stub(userService, 'create').returns(userStub);
      const stubValidate = sinon
        .stub(userService, 'validateIfUserExists')
        .returns(false);

      userController = new UserController(userService);
      await userController.create(req, res);

      expect(stubCreate.calledOnce).to.be.true;
      expect(stubValidate.calledOnce).to.be.true;
      expect(status.args[0].shift()).to.equal(201);
      expect(json.calledOnce).to.be.true;
    });

    it.skip('It should throw error if request parameters are not provided', async () => {
      const req = { body: {} };
      await new UserController().create(req, res);
    });
  });
});
