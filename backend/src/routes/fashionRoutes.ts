import { Router } from 'express';
import { listFashionItems } from '../controllers/fashionController.js';

const fashionRoutes = Router();

fashionRoutes.get('/', listFashionItems);

export default fashionRoutes;
