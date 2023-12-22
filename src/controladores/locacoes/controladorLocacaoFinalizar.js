const knex = require("../../conexoes/conexao");

const controladorLocacaoFinalizar = async (req, res) => {
    const { locacoes_id } = req.body;

    try {
        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();
        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada." });
        }

        if (locacaoEncontrada.situacao === true) {
            const locacaoFinalizada = await knex("locacoes").where("id", locacoes_id).update({
                situacao: false
            });
            if (!locacaoFinalizada) {
                return res.status(500).json({ mensagem: "Locaçõa não pode ser finalizada." });
            }
        } else {
            return res.status(404).json({ mensagem: "Locação já finalizada." });
        }

        return res.status(200).json({ mesagem: "Locação finalizada com sucesso." });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorLocacaoFinalizar;