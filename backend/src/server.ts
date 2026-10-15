import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import articleRoutes from './routes/articleRoutes.js';
import productRoutes from './routes/productRoutes.js';
import fashionRoutes from './routes/fashionRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import { getBannerImages, updateBannerImages } from './controllers/settingsController.js';
import { loginAdmin } from './controllers/adminController.js';
import { requireAdmin } from './middleware/requireAdmin.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);

// Définition des origines autorisées
const allowedOrigins = [
  'https://afac-ahead.com',
  'https://www.afac-ahead.com',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Autorise les requêtes sans origine (comme Postman) ou si l'origine est dans la liste
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqué par la politique CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/admin/login', loginAdmin);

app.use('/api/articles', articleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/fashion', fashionRoutes);
app.use('/api/forum', forumRoutes);

// Endpoints d'administration
app.get('/api/settings/banner', getBannerImages);
app.put('/api/settings/banner', requireAdmin, updateBannerImages);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`AFACOM backend listening on port ${port}`);
});