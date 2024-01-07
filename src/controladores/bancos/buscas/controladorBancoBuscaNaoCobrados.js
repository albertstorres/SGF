const knex = require("../../../conexoes/conexao");

const controladorBancosBuscaNaoCobrados = async (req, res) => {
    const { feiras_id, locacoes_id } = req.body;

    try {
        const feiraEncontrada = await knex("feiras").where("id", feiras_id).first();
        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não cadastrada." });
        }

        const idBancosDafeiraEncontrada = await knex("bancos").select("id").where("feiras_id", feiras_id).orderBy("id");
        if (!idBancosDafeiraEncontrada) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }

        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();
        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada." });
        }

        const bancosJaCobrados = await knex("cobrar").select("bancos_id").where("feiras_id", feiras_id).where("locacoes_id", locacoes_id).orderBy("bancos_id");

        const bancosNaoCobrados = idBancosDafeiraEncontrada.filter((banco) => {
            return banco.bancos_id !== bancosJaCobrados.bancos_id;
        });

        return res.status(200).json({ bancosNaoCobrados });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorBancosBuscaNaoCobrados;