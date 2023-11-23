const knex = require("../../conexoes/conexao");

const controladorLocacaoSituacao = async (req, res) => {
    const { bancos_id, pago_id, naopago_id } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("id", bancos_id).first();
        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado." });
        }

        const pagamentoEncontrado = await knex("pago").where("id", pago_id).first();

        const inadimplenciaEncontrada = await knex("naopago").where("id", naopago_id).first();

        const situacaoCadastrada = await knex("situacao").insert({
            bancos_id,
            pago_id,
            naopago_id
        });

        if (!situacaoCadastrada) {
            return res.status(500).json({ mensagem: "Situação não pode ser cadastrada." });
        }

        return res.status(200).json({ mensagem: "Situação cadastrada com sucesso." });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorLocacaoSituacao;