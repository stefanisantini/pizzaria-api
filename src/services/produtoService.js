import db from '../db/db.js';
export const findAll =  async(idProduto,nomeProduto,formaPagto) => {
    let sql = 'SELECT * FROM produto';
    const conditions= [];
    const valeus= [];

    if (idProduto) {
        conditions.push('idProduto = ?');
        valeus.push(idProduto);
    }

    if (nomeProduto) {
        conditions.push('LOWER(nomeProduto) LIKE ?');
        valeus.push(`%${nomeProduto.toLowerCase()}%`);
    }

      if (formaPagto) {
        conditions.push('LOWER(formaPagto) LIKE ?');
        valeus.push(`%${formaPagto.toLowerCase()}%`)
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join('AND');
    }

    const [rows] = await db.query(sql, valeus);
    return rows;
};

export const create= async (produtoData) => {


    const newProduto = {

    };

    await db.query('INSERT INTO usuario SET ? ', newProduto);

    delete newProduto.senha;
    return newProduto;

};

export const update = async (idProduto, produtoData) => {
  

    const [result] = await db.query('UPDATE usuario SET ? WHERE idProduto = ?', [produtoData,idProduto]);
    return result.affectedRows > 0;
};
    
export const remove = async (idProduto) => {
    const [result] = await db.query('DELETE FROM usuario WHERE idProduto = ?', [idProduto]);
    return result.affectedRows > 0;
};