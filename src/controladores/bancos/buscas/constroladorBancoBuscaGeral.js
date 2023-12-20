const knex = require("../../../conexoes/conexao");

const controladorBancoBuscaGeral = async (req, res) => {
    const { bancos_id, bancos_nome } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("id", bancos_id).where("nome", bancos_nome).first();
        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado." });
        }

        const cliente = await knex("clientes").select("nome").where("id", bancoEncontrado.clientes_id).first();

        const totalDeLocações = await knex("situacao").where("bancos_id", bancos_id);

        const totalDeInadimplencias = await knex("naopago").where("bancos_id", bancos_id);

        const totalDePagos = await knex("pago").where("bancos_id", bancos_id);

        const porcentagemDeInadimplencia = (totalDeInadimplencias.length / totalDeLocações.length) * 100;

        const porcentagemDePagamento = (totalDePagos.length / totalDeLocações.length) * 100;

        const resultado = {
            cliente,
            banco: bancoEncontrado,
            locacoes: totalDeLocações.length,
            pagamentos: totalDePagos,
            inadimplencias: totalDeInadimplencias,
            porcentagemDePagamento,
            porcentagemDeInadimplencia
        }

        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorBancoBuscaGeral;