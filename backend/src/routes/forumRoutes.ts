import { Router } from 'express';
import { listForumPosts } from '../controllers/forumController.js';

const forumRoutes = Router();

forumRoutes.get('/', listForumPosts);

export default forumRoutes;
