import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiPromised from 'chai-as-promised';

import app from '../../src/app';

chai.use(chaiHttp);
chai.use(chaiPromised);

const URL = '/api/users';

describe('Test the user routes', () => {
  it('It should create a new user', () => {
    chai
      .request(app)
      .post(URL)
      .send({
        name: 'test',
        email: 'mail@mail.com',
        password: '1234567',
        username: 'username',
      })
      .then((res) => {
        chai.expect(res).to.be.status(201);
      });
  });

  it('It should throw an error code if the request is invalid', () => {
    chai
      .request(app)
      .post(URL)
      .send({})
      .then((res) => {
        chai.expect(res).to.be.status(417);
      });
  });
});
