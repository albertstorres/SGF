const contadorDeFaltasNoArrayDeBancosID = require("./contadorDeFaltasNoArrayDeBancosID");

const buscaDeInadimpletesIntervaloDatas = (naoPagantes, diaInicio, mesInicio, anoInicio, diaFinal, mesFinal, anoFinal) => {

    let idDosFaltosos = [];

    let dataInicial = new Date(diaInicio, mesInicio, anoInicio);
    dataInicial.setFullYear(anoInicio);
    dataInicial.setMonth(mesInicio - 1);
    dataInicial.setDate(diaInicio);

    let dataFinal = new Date(diaFinal, mesFinal, anoFinal);
    dataFinal.setFullYear(anoFinal);
    dataFinal.setMonth(mesFinal - 1);
    dataFinal.setDate(diaFinal);

    const inadimplentesNoIntervalo = naoPagantes.filter((cobranca) => {
        if (cobranca.data.getTime() >= dataInicial.getTime() && cobranca.data.getTime() <= dataFinal.getTime()) {
            return cobranca;
        }
    });


    for (var i = 0; i < inadimplentesNoIntervalo.length; i++) {
        idDosFaltosos[i] = inadimplentesNoIntervalo[i].bancos_id;
    }

    const faltososComQuantidadesDeFaltasNoPeriodo = contadorDeFaltasNoArrayDeBancosID(idDosFaltosos);

    return {
        inadimplentesNoIntervalo,
        faltososComQuantidadesDeFaltasNoPeriodo
    };

}

module.exports = buscaDeInadimpletesIntervaloDatas;