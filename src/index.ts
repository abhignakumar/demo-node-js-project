import express, { Request, Response } from 'express';
import userRoutes from './routes/user';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Express API Demo (TypeScript)!' });
});

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
