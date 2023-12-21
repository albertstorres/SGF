const knex = require("../../conexoes/conexao");

const controladorBancoAtualizar = async (req, res) => {
    const { id, feiras_id, clientes_id } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("id", id).where("feiras_id", feiras_id).first();
        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado." });
        }

        const clienteEncontrado = await knex("clientes").where("id", clientes_id).first();
        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: "Cliente não cadastrado." });
        }

        const bancoAtualizado = await knex("bancos").where("id", id).update({
            clientes_id,
        });
        if (!bancoAtualizado) {
            return res.status(500).json({ mensagem: "O banco não pode ser atualizado." });
        }

        return res.status(202).json({ mensagem: "Banco atualizado com sucesso." });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorBancoAtualizar;