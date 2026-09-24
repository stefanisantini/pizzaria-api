import express from 'express';

import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlerwares/validate.js';
import {produtoCreateSchema, produtoCreateSchema} from '../controllers/produtoController.js';

// import authMiddleware from '../middlewares/authMiddleware.js;

const router= express.Router();

router.post('/', validate(produtoCreateSchema), produtoCrontoller.adicionarProduto);

// router.use(authMiddleware);
router.get('/', produtoCrontoller.listarProduto);
router.put('/:idProduto', validate(produtoUpdateSchema), produtoCrontoller.atualizarProduto);
router.delete('/:idProduto', produtoCrontoller.deletarProduto);

export default router;