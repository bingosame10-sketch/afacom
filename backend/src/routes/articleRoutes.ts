import { Router } from 'express';
import {
	createArticle,
	deleteArticle,
	listArticles,
	updateArticle,
} from '../controllers/articleController.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const articleRoutes = Router();

articleRoutes.get('/', listArticles);
articleRoutes.post('/', requireAdmin, createArticle);
articleRoutes.put('/:id', requireAdmin, updateArticle);
articleRoutes.delete('/:id', requireAdmin, deleteArticle);

export default articleRoutes;
