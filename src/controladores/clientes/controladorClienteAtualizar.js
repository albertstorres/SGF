const knex = require("../../conexoes/conexao");

const controladorClienteAtualizar = async (req, res) => {
    const { nome, cpf, cep, rua, bairro, numero, cidade, estado, feiras_id } = req.body;

    try {
        const cpfEncontrado = await knex("clientes").where("cpf", cpf).first();
        if (!cpfEncontrado) {
            return res.status(404).json({ mensagem: "Cliente não cadastrado" });
        }

        const clienteAtualizado = await knex("clientes").where("cpf", cpf).update({
            nome,
            cep,
            rua,
            bairro,
            numero,
            cidade,
            estado,
            feiras_id
        });

        if (!clienteAtualizado) {
            return res.status(500).json({ mensagem: "Cliente não pode ser atualizado." });
        }

        return res.status(201).json();

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorClienteAtualizar;