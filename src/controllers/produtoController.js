import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';

export const produtoCreateSchema = Joi.object({
   idProduto: Joi.number().required(),
   nomeProduto: Joi.string().allow('').max(30),
   descricao: Joi.string().required().max(100),
   tipo: Joi.string().required().length(20),
   valor: Joi.number().required(),
   imagem: Joi.string().allow('').max(200)
});

export const produtoUpdateSchema = Joi.object({
    nomeProduto: Joi.string().allow().max(30),
    descricao: Joi.string().max(100),
    tipo: Joi.string().allow().length(30),
    valor: Joi.number(),
    imagem: Joi.string().allow().max(200)
    }).min(1);
     
export const listarProduto = async (req,res) => {
    try {
        const {idProduto,nomeProduto,formaPagto} = req.query;
        const produto = await produtoService.findAll(idProduto,nomeProduto,formaPagto)
        res.json(produto);
    } catch (err) {
        console.error('Erro ao buscar o Produto', err)
        res.status(500).json({error: `Erro Interno do Serviddor`});
    }
};

export const adicionarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.creat(req.body);
        res.status(201).json({message: 'Usuario adicionado com sucesso', data: novoProduto});
        } catch (err) {
            console.error('Erro ao adicionar usuario:', err);
            if (err.code === 'ER_DUP_ENTRY'){
                return res.status(409).json({ erro: 'PRODUTO JÁ CADASTRADO.'});
            }
            res.status(500).json({error: 'Erro ao adicionar o produto'})
        }
};

export const atualizarProduto = async (req, res) => {
    try {
        const {idProduto}= req.params;
        const update= await produtoService.update(req.body);
        if (!update){
            return res.status(404).json({erro: 'Produto não encontrado'});
        }
        res.status(200).json({message: 'Produto atualizado com sucesso'});
    } catch (err) {
    console.error('Erro ao atualizar o produto', err);
    res.status(500).json({error: 'Erro ao atualizar o produto'});        
    }
};

export const deletarProduto = async (req, res) => {
    try {
          const {idProduto}= req.params;
        const deleted = await produtoService.remove(idProduto)
        if (!deleted){
            return res.status(404).json({erro: 'Produto não encontrado'});
        }  
         res.status(200).json({message: 'Produto deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar o produto', err);
    res.status(500).json({error: 'Erro ao deletar o produto'}); 
    }
};