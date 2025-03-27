import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import { calculateQuote } from './routes/quote.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(parser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Zombie Insurance API');
});

// Quote endpoint
app.post('/api/calculate-pricing', calculateQuote);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
