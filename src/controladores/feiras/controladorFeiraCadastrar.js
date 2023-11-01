const knex = require("../../conexoes/conexao");

const controladorFeiraCadastrar = async (req, res) => {
    const { nome } = req.body;

    try {
        const nomeExiste = await knex("feiras").where("nome", nome).first();

        if (nomeExiste) {
            return res.status(404).json({ mensagem: "A feira já foi cadastrada" });
        }

        const feiraCadastrarda = await knex("feiras").insert({
            nome
        });

        if (!feiraCadastrarda) {
            return res.status(500).json({ mensagem: "A feira não foi cadastrada" });
        }

        return res.status(201).json({ mensagem: "Feira cadastrada com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorFeiraCadastrar;