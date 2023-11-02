require("dotenv").config();
const knex = require("../../conexoes/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = process.env.SENHA_JWT;

const controladorUsuarioLogin = async (req, res) => {
    const { username, senha } = req.body;

    try {
        const usuarioEncontrado = await knex("usuarios").where("username", username).first();

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Usuário ou senha inválidos" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);

        if (!senhaCorreta) {
            return res.status(404).json({ mensagem: "Usuário ou senha inválidos" });
        }

        const token = jwt.sign({ id: usuarioEncontrado.id }, senhaJwt, { expiresIn: "1h" });

        const { senha: _, ...dadosUsuario } = usuarioEncontrado;

        return res.status(200).json({ token: token });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorUsuarioLogin;