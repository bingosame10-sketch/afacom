import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import multer from 'multer'; // <--- Import de multer pour gérer les fichiers
import articleRoutes from './routes/articleRoutes.js';
import productRoutes from './routes/productRoutes.js';
import fashionRoutes from './routes/fashionRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import { getBannerImages, updateBannerImages, uploadBannerImage } from './controllers/settingsController.js'; // Ajout de uploadBannerImage
import { loginAdmin } from './controllers/adminController.js';
import { requireAdmin } from './middleware/requireAdmin.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);

// Configuration de multer pour stocker temporairement le fichier en mémoire
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } }); // Limite à 5Mo par image

const allowedOrigins = [
  'https://afac-ahead.com',
  'https://www.afac-ahead.com',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
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

// Augmentation de la limite JSON au cas où
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

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

// --- NOUVEL ENDPOINT D'UPLOAD VERS SUPABASE STORAGE ---
app.post('/api/settings/banner/upload', requireAdmin, upload.single('image'), uploadBannerImage);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`AFACOM backend listening on port ${port}`);
});