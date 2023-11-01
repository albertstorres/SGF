require("dotenv").config();
const bcrypt = require("bcrypt");
const knex = require("../../conexoes/conexao");

const controladorUsuarioCadastrar = async (req, res) => {
    const { nome, username, senha } = req.body;

    try {
        const usernameExiste = await knex("usuarios").where("username", username).first();


        if (usernameExiste) {
            return res.status(404).json({ mensagem: "Usuário já cadastrado" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioCadastrado = await knex("usuarios").insert({
            nome,
            username,
            senha: senhaCriptografada
        });

        if (!usuarioCadastrado) {
            return res.status(500).json({ mensagem: "O usuário não foi cadastrado" });
        }

        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = controladorUsuarioCadastrar;