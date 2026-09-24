import express from 'express';

import * as entregadorController from '../controllers/entregadorController.js';
import validate from '../middlerwares/validate.js';
import {entregadorCreateSchema, entregadorCreateSchema} from '../controllers/entregadorController.js';

// import authMiddleware from '../middlewares/authMiddleware.js;

const router= express.Router();

router.post('/', validate(entregadorCreateSchema), entregadorCrontoller.adicionarEntregador);

// router.use(authMiddleware);
router.get('/', entregadorCrontoller.listarentregador);
router.put('/:idEntregador', validate(entregadorUpdateSchema), entregadorCrontoller.atualizarEntregador);
router.delete('/:idEntregador', entregadorCrontoller.deletarEntregador);

export default router;