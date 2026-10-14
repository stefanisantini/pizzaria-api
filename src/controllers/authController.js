import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioService.js';

export const login = async (req, res) => {
    const {cpf, senha} = req.body;
    try {
        const usuarios = await usuarioService.findAll(cpf);
        const usuario = usuarios[0];

        if(!usuario) {
            return res.status(401).json({message: 'Credencial Invalida'})
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida){
            return res.status(401).json({menssage: 'Credencial Invalida'});
        }
        const payload = {cpf: usuario.cpf, email: usuario.email};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({message: 'Login bem-sucedido!', token: token});
    } catch(error){
      console.error(error);
      res.status(500).json({message: 'Erro interno no servidor.'});  
    }
};