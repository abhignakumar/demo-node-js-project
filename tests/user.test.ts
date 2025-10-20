import request from 'supertest';
import app from '../src/index';

describe('User API', () => {
    test('GET /users should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('POST /users should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Charlie', age: 28 });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Charlie');
    });

    test('GET /users/:id should return a user', async () => {
        const res = await request(app).get('/users/1');
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Alice');
    });
});
