import {Router} from 'express';

import routerCategoria from '../src/modules/projetos/categoria/categoria.routes.js';
import routerProjeto from '../src/modules/projetos/projeto/projeto.routes.js';

const router = Router();

router.use('/', routerCategoria);
router.use('/', routerProjeto);

export default router; 
