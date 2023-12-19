const calcularFaturamentoDasLocacoes = (feiraEncontradaNome, totalDePagantes) => {

    let faturamento;

    if (feiraEncontradaNome === "Gravatá" || feiraEncontradaNome === "Rio Doce" || feiraEncontradaNome === "Tabajara") {
        faturamento = totalDePagantes * 20;
    } else if (feiraEncontradaNome === "Paratibe" || feiraEncontradaNome === "Maranguape 2" || feiraEncontradaNome === "Peixinhos") {
        faturamento = totalDePagantes * 25;
    }

    return faturamento;
}


module.exports = calcularFaturamentoDasLocacoes;