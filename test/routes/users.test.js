// import request from 'supertest';

// import app from '../../src/app';

// const URL = '/api/users';

// const newUser = {
//   name: 'testName',
//   username: 'user1',
//   email: 'mail@mail.com',
//   password: '123456',
// };

// describe('Test the user routes', () => {
//   test('It should create a new user', async () => {
//     const response = await request(app).post(URL).send(newUser);
//     expect(response.status).toBe(201);
//   });

//   test('It should throw an error code if the request is invalid', async () => {
//     const response = await request(app).post(URL).send({});
//     expect(response.status).toBe(417);
//   });
// });
