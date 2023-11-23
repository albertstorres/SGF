const knex = require("../../conexoes/conexao");

const criarSituacao = async (pago, naopago) => {
    const situacao = await knex("situacao").insert({
        pago,
        naopago
    });
    return situacao;
}



module.exports = criarSituacao;