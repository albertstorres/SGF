const knex = require("../../conexoes/conexao");

const criarSituacao = async (bancos_id, pago_id, naopago_id) => {

    const situacao = await knex("situacao").insert({
        bancos_id,
        pago_id,
        naopago_id
    });
    return situacao;
}



module.exports = criarSituacao;