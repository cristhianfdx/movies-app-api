import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import models from '../../src/models';
import UserRepository from '../../src/repository/user.repository';

describe('Test the User Repository', () => {
  const User = models.User;
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
    it('It should create a new user to the database', async () => {
      const stub = sinon.stub(User, 'create').returns(userStub);
      const userRepository = new UserRepository();
      const user = await userRepository.create(userStub);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.equals(userStub);
    });
  });

  describe('getByUsernameOrEmail', () => {
    it('It should retrieve a user with specific username or email', async () => {
      const stub = sinon.stub(User, 'findAll').returns(userStub);
      const userRepository = new UserRepository();
      const user = await userRepository.getByUsernameOrEmail(
        userStub.username,
        userStub.email
      );

      expect(stub.calledOnce).to.be.true;
      expect(user).to.equals(userStub);
    });
  });
});
