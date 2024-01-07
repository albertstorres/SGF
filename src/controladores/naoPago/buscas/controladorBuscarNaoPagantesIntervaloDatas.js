const knex = require("../../../conexoes/conexao");
const buscaDeInadimpletesIntervaloDatas = require("../../../funcoes/buscaDeInadimplentesIntervaloDatas");

const controladorBuscarNaoPagantesIntervaloDatas = async (req, res) => {
    const { diaInicio, mesInicio, anoInicio, diaFinal, mesFinal, anoFinal, feiras_id } = req.body;

    try {
        const feiraEncontrada = await knex("feiras").where("id", feiras_id).first();
        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não cadastrada." });
        }
        const naoPagantes = await knex("cobrar").where("feiras_id", feiras_id).where("status", "NÃO PAGO").orderBy("bancos_id");

        const naoPagantesNoIntervalo = buscaDeInadimpletesIntervaloDatas(
            naoPagantes,
            diaInicio,
            mesInicio,
            anoInicio,
            diaFinal,
            mesFinal,
            anoFinal
        );

        return res.status(200).json(naoPagantesNoIntervalo);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorBuscarNaoPagantesIntervaloDatas;