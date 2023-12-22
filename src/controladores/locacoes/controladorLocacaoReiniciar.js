const knex = require("../../conexoes/conexao");

const controladorLocacaoReiniciar = async (req, res) => {
    const { locacoes_id } = req.body;

    try {
        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();
        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada." });
        }

        if (locacaoEncontrada.situacao === false) {
            const locacaoReiniciada = await knex("locacoes").where("id", locacoes_id).update({
                situacao: true
            });
            if (!locacaoReiniciada) {
                return res.status(500).json({ mensagem: "Locação não pode ser reiniciada." });
            }
        } else {
            return res.status(404).json({ mensagem: "Locação em andamento." });
        }

        return res.status(200).json({ mensagem: "Locação reiniciada com sucesso." });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorLocacaoReiniciar;