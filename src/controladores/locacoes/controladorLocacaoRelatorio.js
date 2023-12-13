const knex = require("../../conexoes/conexao");
const relatorioBancosCobrados = require("../../funcoes/relatorioBancosCobrados");

const controladorLocacaoRelatorio = async (req, res) => {
    const { locacoes_id, feiras_id } = req.body;

    try {
        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();
        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada." });
        }

        const feiraEncontrada = await knex("feiras").where("id", feiras_id).first();
        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não cadastrada." });
        }

        const resultado = await relatorioBancosCobrados(locacoes_id, feiras_id, feiraEncontrada.nome);
        if (!resultado) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }

        return res.status(200).json({ resultado });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorLocacaoRelatorio;