import express from 'express';

const app = express();
const port = 3001;
const userRoutes = require('./routes/userRoutes');

app.get('/', (req, res) => res.json({ message: 'hello world' }));

app.use('/api/v1/user', userRoutes);

app.listen(port);
console.log(`API rodando na porta ${port}`);
