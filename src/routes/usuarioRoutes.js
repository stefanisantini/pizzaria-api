import express from 'express';

import * as usuarioCrontoller from '../controllers/usuarioController.js';
import validate from '../middlerwares/validate.js';
import {usuarioCreateSchema, usuarioUpdateSchema} from '../controllers/usuarioController.js';

// import authMiddleware from '../middlewares/authMiddleware.js;

const router= express.Router();

router.post('/', validate(usuarioCreateSchema), usuarioCrontoller.adicionarUsuario);

// router.use(authMiddleware);
router.get('/', usuarioCrontoller.listarUsuario);
router.put('/:cpf', validate(usuarioUpdateSchema), usuarioCrontoller.atualizarUsuario);
router.delete('/:cpf', usuarioCrontoller.deletarUsuario);

export default router;