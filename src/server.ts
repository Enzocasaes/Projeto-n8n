import express from 'express';
import path from 'path';
import { RandomConnector, TrueRandomNumberOptions } from './connectors/True_Random_Number_Generator';

const app = express();
const PORT = process.env.PORT || 3000;
const connector = new RandomConnector();

app.use(express.json());

// Servir o front-end
app.use(express.static(path.join(__dirname, '../public')));

// API para gerar número randômico
app.post('/api/random', async (req, res) => {
  const { min, max } = req.body as TrueRandomNumberOptions;
  try {
    const result = await connector.execute({ min, max });
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
