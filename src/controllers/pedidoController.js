import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';

export const pedidoCreateSchema = Joi.object({
   formaPagto: Joi.string().required().max(10),
   qtdeItens: Joi.string().required().length(3),
   valorTotal: Joi.number().required(),
   idEntregador: Joi.string().required(),
   cpf: Joi.string().required().length(11)
  });

export const pedidoUpdateSchema = Joi.object({
    formaPagto: Joi.string().required().max(10),
    formaPagto: Joi.string().required().length(3),
    valorTotal: Joi.number().required(),
    idEntregador: Joi.string().required(),
    cpf: Joi.string().required().length(11)
    }).min(1);
     
export const listarPedido = async (req,res) => {
    try {
        const {cpf,idPedido,formaPagto} = req.query;
        const pedido = await produtoService.findAll(cpf,idPedido,formaPagto)
        res.json(pedido);
    } catch (err) {
        console.error('Erro ao buscar o Pedido', err)
        res.status(500).json({error: `Erro Interno do Serviddor`});
    }
};

export const adicionarPedido = async (req, res) => {
    try {
        const novoPedido = await pedidoService.creat(req.body);
        res.status(201).json({message: 'Pedido adicionado com sucesso', data: novoPedido});
        } catch (err) {
            console.error('Erro ao adicionar pedido:', err);
            if (err.code === 'ER_DUP_ENTRY'){
                return res.status(409).json({ erro: 'PEDIDO JÁ CADASTRADO.'});
            }
            res.status(500).json({error: 'Erro ao adicionar o pedido'})
        }
};

export const atualizarPedido = async (req, res) => {
    try {
        const {idPedido}= req.params;
        const update= await pedidoService.update(req.body);
        if (!update){
            return res.status(404).json({erro: 'Pedido não encontrado'});
        }
        res.status(200).json({message: 'Pedido atualizado com sucesso'});
    } catch (err) {
    console.error('Erro ao atualizar o pedido', err);
    res.status(500).json({error: 'Erro ao atualizar o pedido'});        
    }
};

export const deletarPedido = async (req, res) => {
    try {
          const {idPedido}= req.params;
        const deleted = await produtoService.remove(idPedido)
        if (!deleted){
            return res.status(404).json({erro: 'Pedido não encontrado'});
        }  
         res.status(200).json({message: 'Pedido deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar o pedido', err);
    res.status(500).json({error: 'Erro ao deletar o pedido'}); 
    }
};