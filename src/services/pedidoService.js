import db from '../db/db.js';
export const findAll =  async(cpf,idPedido,formaPagto) => {
    let sql = 'SELECT * FROM pedido';
    const conditions= [];
    const valeus= [];

    if (cpf) {
        conditions.push('cpf = ?');
        valeus.push(cpf);
    }

    if (idPedido) {
        conditions.push('idPedido = ?');
        valeus.push(idPedido);
    }

      if (formaPagto) {
        conditions.push('formaPagto = ?');
        valeus.push(formaPagto);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join('AND');
    }

    const [rows] = await db.query(sql, valeus);
    return rows;
};

export const create = async (newPedido) => {
 
    await db.query('INSERT INTO pedido SET ?', newPedido);
 
    return newPedido;
}

export const update = async (idPedido, pedidoData) => {


    const [result] = await db.query('UPDATE pedido SET ? WHERE idPedido = ?', [idPedido, pedidoData]);
    return result.affectedRows > 0;
}
    
export const remove = async (idPedido) => {
    const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
    return result.affectedRows > 0;
};