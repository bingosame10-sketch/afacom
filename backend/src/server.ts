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
const allowedOrigin = process.env.FRONTEND_URL ?? 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/admin/login', loginAdmin);

app.use('/api/articles', articleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/fashion', fashionRoutes);
app.use('/api/forum', forumRoutes);

// Ajouter ces endpoints
app.get('/api/settings/banner', getBannerImages);
app.put('/api/settings/banner', requireAdmin, updateBannerImages);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`AFACOM backend listening on http://localhost:${port}`);
});
