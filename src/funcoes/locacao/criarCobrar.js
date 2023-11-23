const knex = require("../../conexoes/conexao");
const situacao = require("../locacao/criarSituacao");

const criarCobrar = async (locacoes_id, feiras_id, usuarios_id, bancos_id, situacao) => {
    const cobrar = await knex("cobrar").insert({
        locacoes_id,
        feiras_id,
        usuarios_id,
        bancos_id,
        situacao
    });

    return cobrar;
}


module.exports = criarCobrar;