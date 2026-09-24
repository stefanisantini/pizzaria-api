import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';
 
export const usuarioCreateSchema = Joi.object({
    cpf: Joi.string().required().length(11),
    nome: Joi.string().required().max(100),
    endereco: Joi.string().required().max(100),
    bairro: Joi.string().allow('').max(30),
    cidade: Joi.string().allow('').max(30),
    cep: Joi.string().required().length(8),
    telefone: Joi.string().required(),
    email: Joi.string().required().email().max(50),
    senha: Joi.string().required().max(100),
    tipo: Joi.string().required().max(10)
});
 
export const usuarioUpdateSchema = Joi.object({
nome: Joi.string().max(100),
endereco: Joi.string().max(100),
bairro: Joi.string().allow().max(30),
cidade: Joi.string().allow().max(30),
cep: Joi.string().max(8),
telefone: Joi.string(),
email: Joi.string().email().max(50),
senha: Joi.string().max(100),
}).min(1);
 
export const listarUsuario = async (req,res) => {
    try {
        const {cpf, nome, email} = req.query;
        const usuario = await usuarioService.findAll(cpf, nome, email)
        res.json(usuario);
    } catch (err) {
        console.error('Erro ao buscar o Usuario', err)
        res.status(500).json({error: `Erro Interno do Serviddor`});
    }
};

export const adicionarUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuarioService.creat(req.body);
        res.status(201).json({message: 'Usuario adicionado com sucesso', data: novoUsuario});
        } catch (err) {
            console.error('Erro ao adicionar usuario:', err);
            if (err.code === 'ER_DUP_ENTRY'){
                return res.status(409).json({ erro: 'CPF JÁ CADASTRADO.'});
            }
            res.status(500).json({error: 'Erro ao adicionar o usuario'})
        }
};

export const atualizarUsuario = async (req, res) => {
    try {
        const {cpf}= req.params;
        const update= await usuarioService.update(req.body);
        if (!update){
            return res.status(404).json({erro: 'Usuario não encontrado'});
        }
        res.status(200).json({message: 'Usuario atualizado com sucesso'});
    } catch (err) {
    console.error('Erro ao atualizar o usuario', err);
    res.status(500).json({error: 'Erro ao atualizar o usuario'});        
    }
};

export const deletarUsuario = async (req, res) => {
    try {
          const {cpf}= req.params;
        const deleted = await usuarioService.remove(cpf);
        if (!deleted){
            return res.status(404).json({erro: 'Usuario não encontrado'});
        }  
         res.status(200).json({message: 'Usuario deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar o usuario', err);
    res.status(500).json({error: 'Erro ao deletar o usuario'}); 
    }
};