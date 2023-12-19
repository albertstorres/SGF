const intermediarioBuscarNaoPagantesIntervaloDatas = (joiSchema) => async (req, res, next) => {
    const { diaInicio, mesInicio, anoInicio, diaFinal, mesFinal, anoFinal, feiras_id } = req.body;

    try {

        await joiSchema.validateAsync({
            diaInicio,
            mesInicio,
            anoInicio,
            diaFinal,
            mesFinal,
            anoFinal,
            feiras_id
        });

        if (anoFinal < anoInicio) {
            return res.status(404).json({ mensagem: "Data inválida." });
        } else if (mesFinal < mesInicio && anoFinal == anoInicio) {
            return res.status(404).json({ mensagem: "Data inválida." });
        } else if (diaFinal < diaInicio && mesFinal == mesInicio && anoFinal == anoInicio) {
            return res.status(404).json({ mensagem: "Data inválida." });
        }

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }

}


module.exports = intermediarioBuscarNaoPagantesIntervaloDatas;