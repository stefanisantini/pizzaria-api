import express from 'express';

import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlerwares/validate.js';
import {produtoCreateSchema, produtoUpdateSchema} from '../controllers/produtoController.js';

import authMiddleware from '../middlerwares/authMiddleware.js';

const router= express.Router();


router.use(authMiddleware);
router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);
router.get('/', produtoController.listarProduto);
router.put('/:idProduto', validate(produtoUpdateSchema), produtoController.atualizarProduto);
router.delete('/:idProduto', produtoController.deletarProduto);

export default router;