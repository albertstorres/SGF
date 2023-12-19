const knex = require("../conexoes/conexao");

const criarCobranca = async (locacoes_id, feiras_id, usuarios_id, bancos_id, situacao_id, status) => {
    const cobranca = await knex("cobrar").insert({
        locacoes_id,
        feiras_id,
        usuarios_id,
        bancos_id,
        situacao_id,
        status
    });

    return cobranca;

}


module.exports = criarCobranca;