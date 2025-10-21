import { Router, Request, Response } from 'express';

interface User {
    id: number;
    name: string;
    age: number;
}

let users: User[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 }
];

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json(users);
});

router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

router.post('/', (req: Request, res: Response) => {
    const { name, age } = req.body as { name: string; age: number };
    const id = users.length + 1;
    const newUser: User = { id, name, age };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.put('/:id/age', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { age } = req.body as { age: number };
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.age = age;
    res.json(user);
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    users = users.filter(u => u.id !== id);
    res.json({ message: 'User deleted' });
});

export default router;
