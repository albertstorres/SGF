const knex = require("../../conexoes/conexao");

const criarSituacao = require("../../funcoes/criarSituacao");
const criarCobranca = require("../../funcoes/criarCobranca");
const { uploadArquivo } = require("../../arquivos/upload/storage");

let pagamentosJaEfetuados = [];
let inadimplenciasDoEvento = [];
let naopago_id;
const pago_id = null;
let situacao_id;
let arquivo;



const controladorNaoPagoCadastrar = async (req, res) => {
    const { bancos_id, locacoes_id, } = req.body;
    const { file } = req;
    const { id } = req.usuario;
    const status = 'NÃO PAGO';

    const usuarios_id = id;

    try {
        const bancoEncontrado = await knex("bancos").where("id", bancos_id).first();

        if (!bancoEncontrado) {
            return res.status(404).json({ mensagem: "Banco não cadastrado" });
        }

        const { feiras_id } = bancoEncontrado;

        const locacaoEncontrada = await knex("locacoes").where("id", locacoes_id).first();

        if (!locacaoEncontrada) {
            return res.status(404).json({ mensagem: "Locação não cadastrada" })
        }

        if (locacaoEncontrada.situacao === false) {
            return res.status(404).json({ mensagem: "Locação finalizada." });
        }

        inadimplenciasDoEvento = await knex("naopago").where("locacoes_id", locacoes_id);

        const inadimplenciaEncontrada = inadimplenciasDoEvento.some((inadimplencia) => {
            return inadimplencia.bancos_id == bancos_id;
        });

        if (inadimplenciaEncontrada) {
            return res.status(404).json({ mensagem: "Inadimpência já cadastrada." });
        }

        pagamentosJaEfetuados = await knex("pago").where("locacoes_id", locacoes_id);

        const pagamentoEncontrado = pagamentosJaEfetuados.some((pagamento) => {
            return pagamento.bancos_id == bancos_id;
        });

        if (pagamentoEncontrado) {
            return res.status(404).json({ mensagem: "Já foi cadastrado um pagamento." });
        }

        if (!file) {
            return res.status(404).json({ mensagem: "Arquivo de foto é obrigatório." });
        }

        else if (file) {
            arquivo = await uploadArquivo(file.originalname, file.buffer, file.mimetype);
        }


        if (!arquivo) {
            return res.status(500).json("Erro interno do servidor. Upload arquivo.");
        }

        const inadimplenciaCadastrada = await knex("naopago").insert({
            bancos_id,
            locacoes_id,
            foto: arquivo.url,
            feiras_id
        }).returning("id");

        if (!inadimplenciaCadastrada) {
            return res.status(500).json({ mensagem: "Inadimplência não cadastrada" });
        }

        naopago_id = inadimplenciaCadastrada[0].id;

        const cadastrarSituacao = await criarSituacao(bancos_id, pago_id, naopago_id, feiras_id);

        if (!cadastrarSituacao) {
            return res.status(500).json({ mensagem: "Situção não cadastrada." });
        }

        situacao_id = cadastrarSituacao[0].id;

        const cadastrarCobranca = await criarCobranca(locacoes_id, feiras_id, usuarios_id, bancos_id, situacao_id, status);

        if (!cadastrarCobranca) {
            return res.status(500).json({ mensagem: "Cobrança não cadastrada." });
        }

        return res.status(201).json({ mensagem: "Inadimplência cadastrada com sucesso" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}



module.exports = controladorNaoPagoCadastrar;