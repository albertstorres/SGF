const knex = require("../../conexoes/conexao");
const criarSituacao = require("../../funcoes/locacao/criarSituacao");
const criarCobrar = require("../../funcoes/locacao/criarCobrar");
let pagamentosJaEfetuados = [];
let inadimplenciasDoEvento = [];
let pago_id;
const naopago_id = null;

const controladorPagoCadastrar = async (req, res) => {
    const { bancos_id, locacoes_id } = req.body;

    try {
        const bancoEncontrado = await knex("bancos").where("id", bancos_id).first();

        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "O banco não está cadastrado" });
        }

        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();

        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada" });
        }

        pagamentosJaEfetuados = await knex("pago").where("locacoes_id", locacoes_id);

        const pagamentoEncontrado = pagamentosJaEfetuados.some((pagamento) => {
            return pagamento.bancos_id === bancos_id;
        });

        if (pagamentoEncontrado) {
            return res.status(404).json({ mensagem: "O pagamento já foi cadastrado." });
        }

        inadimplenciasDoEvento = await knex("naopago").where("locacoes_id", locacoes_id);

        const inadimplenciaEncontrada = inadimplenciasDoEvento.some((inadimplencia) => {
            return inadimplencia.bancos_id === bancos_id;
        });

        if (inadimplenciaEncontrada) {
            return res.status(404).json({ mensagem: "Já foi cadastrada uma inadinplência." });
        }

        const pagamentoCadastrado = await knex("pago").insert({
            bancos_id,
            locacoes_id
        }).returning("id");

        if (!pagamentoCadastrado) {
            return res.status(500).json({ mensagem: "Pagamento não registrado" });
        }

        console.log(pagamentoCadastrado);

        pago_id = pagamentoCadastrado[0].id;

        const cadastrarSituacao = await criarSituacao(bancos_id, pago_id, naopago_id);

        if (!cadastrarSituacao) {
            return res.status(500).json({ mensagem: "Situação não cadastrada." });
        }

        return res.status(201).json({ mensagem: "Pagamento cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorPagoCadastrar;