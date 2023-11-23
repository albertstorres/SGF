const knex = require("../../conexoes/conexao");
const criarSituacao = require("../../funcoes/locacao/criarSituacao");
const criarCobrar = require("../../funcoes/locacao/criarCobrar");

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

        const pagamentoEncontrado = await knex("pago").where("locacoes_id", locacoes_id).first();

        if (pagamentoEncontrado) {
            const bancoEncontrado = await knex("pago").where("bancos_id", bancos_id).first();
            if (bancoEncontrado) {
                return res.status(404).json({ mensagem: "O pagamento já foi cadastrado." });
            }
        }

        const inadimplenciaEncontrada = await knex("naopago").where("locacoes_id", locacoes_id).first();

        if (inadimplenciaEncontrada) {
            const bancoEncontrado = await knex("naopago").where("bancos_id", bancos_id).first();
            if (bancoEncontrado) {
                return res.status(404).json({ mensagem: "Inadimplência já cadastrada." });
            }
        }

        const pagamentoCadastrado = await knex("pago").insert({
            bancos_id,
            locacoes_id
        });

        if (!pagamentoCadastrado) {
            return res.status(500).json({ mensagem: "Pagamento não registrado" });
        }

        return res.status(201).json({ mensagem: "Pagamento cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorPagoCadastrar;