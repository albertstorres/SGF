require("dotenv").config();
const knex = require("../../conexoes/conexao");
const jwt = require("jsonwebtoken");
const senhaJwt = process.env.SENHA_JWT;

const intermediarioUsuarioVerificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, senhaJwt);

        const { senha, ...usuario } = await knex("usuarios").where({ id }).first();

        if (!usuario) {
            return res.status(401).json(({ mensagem: "Não autorizado" }));
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }

}


module.exports = intermediarioUsuarioVerificarLogin;