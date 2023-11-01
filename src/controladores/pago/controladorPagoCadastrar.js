const knex = require("../../conexoes/conexao");

const controladorPagoCadastrar = async (req, res) => {
    const { bancos_id, locacoes_id } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("id", bancos_id).first();

        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "O banco não está cadastrado" });
        }

        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();

        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada" });
        }

        const pagamentoCadastrado = await knex("pago").insert({
            bancos_id,
            locacoes_id
        });

        return res.status(201).json({ mensagem: "Pagamento cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorPagoCadastrar;