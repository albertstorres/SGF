const knex = require("../../conexoes/conexao");
const { excluirArquivo } = require("../../arquivos/upload/storage");
let splitUrl;
let pathImagem;

const controladorNaoPagoDeletar = async (req, res) => {
    const { bancos_id, feiras_id, locacoes_id } = req.body;

    try {
        const naoPagoEncontrado = await knex("naopago").where("locacoes_id", locacoes_id).where("bancos_id", bancos_id).where("feiras_id", feiras_id).first();
        if (!naoPagoEncontrado) {
            return res.status(401).json({ mensagem: "Inadimplência não cadastrada." });
        }

        const urlImagem = naoPagoEncontrado.foto;
        if (urlImagem) {
            splitUrl = urlImagem.split("/");
            pathImagem = splitUrl[3];
            await excluirArquivo(pathImagem);
        }

        const situacaoEncontrada = await knex("situacao").where("bancos_id", bancos_id).where("naopago_id", naoPagoEncontrado.id).where("feiras_id", feiras_id).first();
        if (!situacaoEncontrada) {
            return res.status(500).json({ mensagem: "O banco não foi cobrado na semana informada." });
        }

        const situacaoDeletada = await knex("situacao").where("id", situacaoEncontrada.id).delete();
        if (!situacaoDeletada) {
            return res.status(500).json({ mensagem: "Situação não deletada." });
        }

        const naoPagoDeletado = await knex("naopago").where("id", naoPagoEncontrado.id).delete();
        if (!naoPagoDeletado) {
            return res.status(500).json({ mensagem: "A inadimplência não pode ser deletada." });
        }

        return res.status(204).json({ mensagem: "Inadimplência deletada com sucesso." });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = controladorNaoPagoDeletar;