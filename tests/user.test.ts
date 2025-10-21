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

    test('PUT /users/:id/age should update age correctly', async () => {
        const res = await request(app)
            .put('/users/1/age')
            .send({ age: 26 });
        expect(res.status).toBe(200);
        expect(res.body.age).toBe(26);
    });

    test('DELETE /users/:id should remove a user', async () => {
        await request(app).delete('/users/2');
        const res = await request(app).get('/users');
        const userIds = res.body.map((u: any) => u.id);
        expect(userIds).not.toContain(2);
    });
});
