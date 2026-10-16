import db from '../db/db.js';
export const findAll =  async(idProduto,nomeProduto,tipo) => {
    let sql = 'SELECT * FROM produto';
    const conditions= [];
    const values= [];

    if (idProduto) {
        conditions.push('idProduto = ?');
        values.push(idProduto);
    }

    if (nomeProduto) {
        conditions.push('LOWER(nomeProduto) LIKE ?');
        values.push(`%${nomeProduto.toLowerCase()}%`);
    }

      if (tipo) {
        conditions.push('LOWER(tipo) LIKE ?');
        values.push(`%${tipo.toLowerCase()}%`)
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join('AND');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (newProduto) => {
 
    await db.query('INSERT INTO produto SET ?', newProduto);
 
    return newProduto;
}

export const update = async (produtoData,idProduto) => {
  

    const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [idProduto, produtoData]);
    return result.affectedRows > 0;
};
    
export const remove = async (idProduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?', [idProduto]);
    return result.affectedRows > 0;
};