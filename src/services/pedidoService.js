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

export const create= async (pedidoData) => {


    const newPedido = {

    };

    await db.query('INSERT INTO usuario SET ? ', newPedido);

    delete newPedido.senha;
    return newPedido;

};

export const update = async (cpf, pedidoData) => {


    const [result] = await db.query('UPDATE usuario SET ? WHERE cpf = ?', [pedidoData,cpf]);
    return result.affectedRows > 0;
}
    
export const remove = async (cpf) => {
    const [result] = await db.query('DELETE FROM usuario WHERE cpf = ?', [cpf]);
    return result.affectedRows > 0;
};