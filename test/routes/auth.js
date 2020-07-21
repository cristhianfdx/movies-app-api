// import { jest, expect, beforeAll } from '@jest/globals';
// import request from 'supertest';

// import app from '../../src/app';
// import { login } from '../../src/controllers/auth.controller';

// const authController = { login };

// const URL = '/api/auth/login';

// const user = {
//   username: 'test1',
//   password: '12345667890',
// };

// beforeAll(() => {});

// describe('Test the user routes', () => {
//   test('It should create a user session', async () => {
//     const mockController = jest.spyOn(authController, 'login');
//     console.log(mockController);

//     const response = await request(app).post(URL).send(user);

//     expect(mockController).toHaveBeenCalled();
//     expect(response.status).toBe(200);
//     mockController.mockRestore();
//   });
// });
