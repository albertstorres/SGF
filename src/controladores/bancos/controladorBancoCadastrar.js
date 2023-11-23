const knex = require("../../conexoes/conexao");

const controladorBancoCadastrar = async (req, res) => {
    const { nome, feiras_id, clientes_id } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("nome", nome).first();

        if (bancoEncontrado) {
            return res.status(404).json({ mensagem: "O banco já está cadastrado" });
        }

        const feiraEncontrada = await knex("feiras").where("id", feiras_id).first();

        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não cadastrada" });
        }

        const clienteEncontrado = await knex("clientes").where("id", clientes_id).first();

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: "Cliente não cadastrado" });
        }

        const bancoCadastrado = await knex("bancos").insert({
            nome,
            feiras_id,
            clientes_id
        });

        if (!bancoCadastrado) {
            return res.status(500).json({ mensagem: "O banco não foi cadastrado" });
        }

        return res.status(201).json({ mensagem: "Banco cadastrado com sucesso." });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorBancoCadastrar;