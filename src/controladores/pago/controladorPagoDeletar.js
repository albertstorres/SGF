const knex = require("../../conexoes/conexao");

const controladorPagoDeletar = async (req, res) => {
    const { bancos_id, feiras_id, locacoes_id } = req.body;

    try {
        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();
        if (!locacaoEncontrada) {
            return res.statsu(404).json({ mensagem: "Locação não cadastrada." });
        }

        const feiraEncontrada = await knex("feiras").where("id", feiras_id).first();
        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não cadastrada." });
        }

        const bancoEncontrado = await knex("bancos").where("id", bancos_id).where("feiras_id", feiras_id).first();
        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado." });
        }

        const pagamentoEncontrado = await knex("pago").where("bancos_id", bancos_id).where("locacoes_id", locacoes_id).where("feiras_id", feiras_id).first();
        if (!pagamentoEncontrado) {
            return res.status(404).json({ mensagem: "Pagamento não cadastrado." });
        }

        const idPagamentoEncontrado = pagamentoEncontrado.id;

        const situacaoEncontrada = await knex("situacao").where("bancos_id", bancos_id).where("pago_id", idPagamentoEncontrado).where("feiras_id", feiras_id).first();

        const cobrarDeletado = await knex("cobrar").where("locacoes_id", locacoes_id).where("feiras_id", feiras_id).where("bancos_id", bancos_id).where("situacao_id", situacaoEncontrada.id).delete();
        if (!cobrarDeletado) {
            return res.status(500).json({ mensagem: "A cobrança não pode ser deletada." });
        }

        const situacaoDeletada = await knex("situacao").where("pago_id", idPagamentoEncontrado).delete();
        if (!situacaoDeletada) {
            return res.status(500).json({ mensagem: "A situacao não pode ser deletada." });
        }

        const pagamentoDeletado = await knex("pago").where("id", idPagamentoEncontrado).delete();
        if (!pagamentoDeletado) {
            return res.status(500).json({ mensagem: "O pagamento não pode ser deletado." });
        }

        return res.status(204).json({ mensagem: "Pagamento deletado com sucesso." });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorPagoDeletar;