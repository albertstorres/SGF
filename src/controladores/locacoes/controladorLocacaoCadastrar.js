const knex = require("../../conexoes/conexao");

const controladorLocacaoCadastrar = async (req, res) => {
    const { situacao } = req.body;

    try {
        const locacaoCadastrada = await knex("locacoes").insert({
            situacao
        });

        if (!locacaoCadastrada) {
            return res.status(500).json({ mensagem: "Locação não cadastrada" });
        }

        return res.status(201).json({ mensagem: "Locação cadastrada com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorLocacaoCadastrar;