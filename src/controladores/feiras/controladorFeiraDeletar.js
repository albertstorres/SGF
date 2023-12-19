const knex = require("../../conexoes/conexao");

const controladorFeiraDeletar = async (req, res) => {
    const { id, nome } = req.body;

    try {
        const feiraEncontrada = await knex("feiras").where("id", id).where("nome", nome).first();
        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não cadastrada." });
        }

        const feiraDeletada = await knex("feiras").where("id", id).delete();

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorFeiraDeletar;