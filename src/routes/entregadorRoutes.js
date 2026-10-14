import express from 'express';

import * as entregadorController from '../controllers/entregadorController.js';
import validate from '../middlerwares/validate.js';
import {entregadorCreateSchema, entregadorUpdateSchema} from '../controllers/entregadorController.js';

// import authMiddleware from '../middlewares/authMiddleware.js;

const router= express.Router();

router.post('/', validate(entregadorCreateSchema), entregadorController.adicionarEntregador);

// router.use(authMiddleware);
router.get('/', entregadorController.listarEntregadores);
router.put('/:idEntregador', validate(entregadorUpdateSchema), entregadorController.atualizarEntregador);
router.delete('/:idEntregador', entregadorController.removerEntregador);

export default router;