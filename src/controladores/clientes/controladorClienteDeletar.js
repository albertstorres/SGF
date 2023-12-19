const knex = require("../../conexoes/conexao");

const controladorClienteDeletar = async (req, res) => {
    const { cpf } = req.body;

    try {
        const clienteEncontrado = await knex("clientes").where("cpf", cpf).first();
        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: "Cliente não cadastrado." });
        }

        const clienteDeletado = await knex("clientes").where("cpf", cpf).delete();
        if (!clienteDeletado) {
            return res.status(500).json({ mensagem: "Cliente nao pode ser deletado." });
        }

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorClienteDeletar;