import db from '../db/db.js';
export const findAll =  async(idEntregador,nomeEntregador,telefone) => {
    let sql = 'SELECT * FROM entregador';
    const conditions= [];
    const valeus= [];

    if (idEntregador) {
        conditions.push('idEntregador = ?');
        valeus.push(idEntregador);
    }

    if (nomeEntregador) {
        conditions.push('LOWER(nomeEntregador) LIKE ?');
        valeus.push(`%${nomeEntregador.toLowerCase()}%`);
    }

      if (telefone) {
        conditions.push('telefone = ?');
        valeus.push(telefone)
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join('AND');
    }

    const [rows] = await db.query(sql, valeus);
    return rows;
};

export const create= async (entregadorData) => {


    const newEntregador = {

    };

    await db.query('INSERT INTO usuario SET ? ', newEntregador);

    delete newEntregador.senha;
    return newEntregador;

};

export const update = async (idEntregador, entregadorData) => {
  

    const [result] = await db.query('UPDATE usuario SET ? WHERE idEntregador = ?', [entregadorData,idEntregador]);
    return result.affectedRows > 0;
};
    
export const remove = async (idEntregador) => {
    const [result] = await db.query('DELETE FROM usuario WHERE idEntregador = ?', [idEntregador]);
    return result.affectedRows > 0;
};