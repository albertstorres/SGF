const knex = require("../conexoes/conexao");
const calcularFaturamentoDasLocacoes = require("../funcoes/calcularFaturamentoDasLocacoes");

const relatorioBancosCobrados = async (locacoes_id, feiras_id, feiraEncontradaNome) => {
    let bancosMontadosNaFeira = [];
    let bancosPagos = [];
    let bancosNaoPagos = [];

    bancosMontadosNaFeira = await knex("cobrar").where("feiras_id", feiras_id).where("locacoes_id", locacoes_id).orderBy("bancos_id");

    bancosPagos = bancosMontadosNaFeira.filter((pago) => {
        return pago.status === 'PAGO';
    });

    bancosNaoPagos = bancosMontadosNaFeira.filter((naoPago) => {
        return naoPago.status === 'NÃO PAGO';
    });

    const bancosDaFeiraAnalisada = await knex("bancos").where("feiras_id", feiras_id);

    const totalDeBancosDaFeira = bancosDaFeiraAnalisada.length;

    const totalDeInadimplentes = bancosNaoPagos.length;

    const porcentagemDeInadimplentes = (totalDeInadimplentes / totalDeBancosDaFeira) * 100;

    const totalDePagantes = bancosPagos.length;

    const faturamentoDaFeira = calcularFaturamentoDasLocacoes(feiraEncontradaNome, totalDePagantes);

    return {
        bancosMontadosNaFeira,
        feira: feiraEncontradaNome,
        totalDeBancosRecebidos: totalDePagantes,
        totalDeBancosNaoRecebidos: totalDeInadimplentes,
        porcentagemDeInadimplentes: `${porcentagemDeInadimplentes} %`,
        faturamento: faturamentoDaFeira,
    };

}


module.exports = relatorioBancosCobrados;