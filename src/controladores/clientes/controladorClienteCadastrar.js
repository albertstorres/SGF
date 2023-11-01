const knex = require("../../conexoes/conexao");

const controladorClienteCadastrar = async (req, res) => {
    const { nome, cpf, cep, rua, bairro, numero, cidade, estado, feiras_id } = req.body;

    try {
        const cpfEncontrado = await knex("clientes").where("cpf", cpf).first();

        if (cpfEncontrado) {
            return res.status(404).json({ mensagem: "Cliente já cadastrado" });
        }

        const feiraEncontrada = await knex("feiras").where("id", feiras_id).first();

        if (!feiraEncontrada) {
            return res.status(404).json({ mensagem: "Feira não encontrada" });
        }

        const clienteCadastrado = await knex("clientes").insert({
            nome,
            cpf,
            cep,
            rua,
            bairro,
            numero,
            cidade,
            estado,
            feiras_id
        });

        if (!clienteCadastrado) {
            return res.status(500).json({ mensgem: "Cliente não cadastrado" });
        }

        return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorClienteCadastrar;