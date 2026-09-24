import express from 'express';

import * as pedidoController from '../controllers/pedidoController.js';
import validate from '../middlerwares/validate.js';
import {pedidoCreateSchema, pedidoCreateSchema} from '../controllers/pedidoController.js';

// import authMiddleware from '../middlewares/authMiddleware.js;

const router= express.Router();

router.post('/', validate(pedidoCreateSchema), pedidoCrontoller.adicionarPedido);

// router.use(authMiddleware);
router.get('/', pedidoCrontoller.listarPedido);
router.put('/:idPedido', validate(pedidoUpdateSchema), pedidoCrontoller.atualizarPedido);
router.delete('/:idPedido', pedidoCrontoller.deletarPedido);

export default router;