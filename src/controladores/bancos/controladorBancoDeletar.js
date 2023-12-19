const knex = require("../../conexoes/conexao");

const controladorBancoDeletar = async (req, res) => {
    const { id, feiras_id } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("id", id).where("feiras_id", feiras_id).first();
        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado." });
        }

        const bancoDeletado = await knex("bancos").where("id", id).delete();
        if (!bancoDeletado) {
            return res.status(500).json({ mensagem: "O banco não pode ser deletado." });
        }

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorBancoDeletar;