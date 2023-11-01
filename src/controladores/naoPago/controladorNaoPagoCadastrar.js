const knex = require("../../conexoes/conexao");

const controladorNaoPagoCadastrar = async (req, res) => {
    const { bancos_id, locacoes_id, foto } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("id", bancos_id).first();

        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado" });
        }

        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();

        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada" })
        }

        const naoPagoCCadastrado = await knex("naopago").insert({
            bancos_id,
            locacoes_id,
            foto
        });

        if (!naoPagoCCadastrado) {
            return res.status(500).json({ mensagem: "Inadimplência não cadastrada" });
        }

        return res.status(201).json({ mensagem: "Inadimplência cadastrada com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorNaoPagoCadastrar;