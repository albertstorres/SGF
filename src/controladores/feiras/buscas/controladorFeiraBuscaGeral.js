const knex = require("../../../conexoes/conexao");
const calcularFaturamentoDaslocacoes = require("../../../funcoes/calcularFaturamentoDasLocacoes");

const controladorFeiraBuscaGeral = async (req, res) => {
    const { feiras_id, feiras_nome } = req.body;

    try {
        const feiraEncontrada = await knex("feiras").where("id", feiras_id).where("nome", feiras_nome).first();
        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não cadastrada." });
        }

        const totalDePagamentos = await knex("cobrar").where("feiras_id", feiras_id).where("status", "PAGO");

        const totalDeInadimplencias = await knex("cobrar").where("feiras_id", feiras_id).where("status", "NÃO PAGO");

        const totalDeCobranca = await knex("cobrar").where("feiras_id", feiras_id);

        const porcentagemDePagamento = `${(totalDePagamentos.length / totalDeCobranca.length) * 100} %`;

        const porcentagemDeInadimplencia = `${(totalDeInadimplencias.length / totalDeCobranca.length) * 100} %`;

        const totalFaturado = calcularFaturamentoDaslocacoes(feiraEncontrada.nome, totalDePagamentos.length);

        const resultado = {
            feira: feiraEncontrada.nome,
            totalDeCobranca: totalDeCobranca.length,
            totalDePagamentos: totalDePagamentos.length,
            totalDeInadimplencias: totalDeInadimplencias.length,
            porcentagemDePagamento,
            porcentagemDeInadimplencia,
            totalFaturado
        };

        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = controladorFeiraBuscaGeral;