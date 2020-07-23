import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import UserRepository from '../../src/repository/user.repository';
import UserService from '../../src/services/user.service';

describe('Test the User service', () => {
  const userStub = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };

  describe('create', () => {
    it('It should execute create method', async () => {
      const userRepository = new UserRepository();
      const stub = sinon.stub(userRepository, 'create').returns(userStub);

      const userService = new UserService(userRepository);
      const user = await userService.create(userStub);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.be.equals(userStub);
    });
  });

  describe('validateIfUserExists', () => {
    it('It should return true if username already exists', async () => {
      const userRepository = new UserRepository();
      const stub = sinon
        .stub(userRepository, 'getByUsernameOrEmail')
        .returns([userStub]);

      const userService = new UserService(userRepository);
      const validation = await userService.validateIfUserExists(
        userStub.username
      );

      expect(stub.calledOnce).to.be.true;
      expect(validation).to.be.true;
    });

    it('It should return true if email already exists', async () => {
      const userRepository = new UserRepository();
      const stub = sinon
        .stub(userRepository, 'getByUsernameOrEmail')
        .returns([userStub]);

      const userService = new UserService(userRepository);
      const validation = await userService.validateIfUserExists(userStub.email);

      expect(stub.calledOnce).to.be.true;
      expect(validation).to.be.true;
    });

    it('It should return false if username not exists', async () => {
      const userRepository = new UserRepository();
      const stub = sinon
        .stub(userRepository, 'getByUsernameOrEmail')
        .returns([]);

      const userService = new UserService(userRepository);
      const validation = await userService.validateIfUserExists(
        userStub.username
      );

      expect(stub.calledOnce).to.be.true;
      expect(validation).to.be.false;
    });

    it('It should return false if email not exists', async () => {
      const userRepository = new UserRepository();
      const stub = sinon
        .stub(userRepository, 'getByUsernameOrEmail')
        .returns([]);

      const userService = new UserService(userRepository);
      const validation = await userService.validateIfUserExists(userStub.email);

      expect(stub.calledOnce).to.be.true;
      expect(validation).to.be.false;
    });

    it('It should return false if username and email not exists', async () => {
      const userRepository = new UserRepository();
      const stub = sinon
        .stub(userRepository, 'getByUsernameOrEmail')
        .returns([]);

      const userService = new UserService(userRepository);
      const validation = await userService.validateIfUserExists(
        userStub.username,
        userStub.email
      );

      expect(stub.calledOnce).to.be.true;
      expect(validation).to.be.false;
    });
  });
});
