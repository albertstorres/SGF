const knex = require("../../conexoes/conexao");

const controladorLocacaoCobrar = async (req, res) => {
    const { locacoes_id, feiras_id, bancos_id, situacao_id } = req.body;
    const { id } = req.usuario;
    console.log(id);
    let status;

    try {
        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();
        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada." });
        }

        const feiraEncontrada = await knex("feiras").where("id", feiras_id).first();
        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não encontrada." });
        }

        const usuarioEncontrado = await knex("usuarios").where("id", id).first();
        if (!usuarioEncontrado) {
            return res.status(401).json({ mensagem: "Usuário não cadastrado." });
        }

        const bancoEncontrado = await knex("bancos").where("id", bancos_id).first();
        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado." });
        }

        const situacaoEncontrada = await knex("situacao").where("id", situacao_id).first();
        if (!situacaoEncontrada) {
            return res.status(404).json({ mensagem: "Situação não cadastrada." });
        }

        if (situacaoEncontrada.pago_id) {
            status = 'Pago';
        } else if (!situacaoEncontrada.pago_id) {
            if (situacaoEncontrada.naopago_id) {
                status = 'Não Pago';
            }
        }
        console.log(status);

        const cobrancaCadastrada = await knex("cobrar").insert({
            locacoes_id,
            feiras_id,
            usuarios_id: id,
            bancos_id,
            situacao_id,
            status
        });

        if (!cobrancaCadastrada) {
            return res.status(500).json({ mensagem: "Cobrança cadastrada." });
        }

        return res.status(200).json({ mensagem: "Cobrança cadastrada com sucesso." });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorLocacaoCobrar;