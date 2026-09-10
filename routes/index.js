import {Router} from 'express';

import routerCategoria from '../src/modules/projetos/categoria/categoria.routes.js';

const router = Router();

router.use('/categoria', routerCategoria);

export default router; 
