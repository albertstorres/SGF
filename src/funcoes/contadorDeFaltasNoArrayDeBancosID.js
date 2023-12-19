const contadorDeFaltasNoArrayDeBancosID = (array) => {

    const contador = Object.create(null);

    for (const elemento of array) {
        contador[elemento] = (contador[elemento] || 0) + 1;
    }

    return Object.entries(contador).map(([valor, contador]) => ({
        Banco_ID: Number(valor),
        Faltas: contador
    }));

}


module.exports = contadorDeFaltasNoArrayDeBancosID;