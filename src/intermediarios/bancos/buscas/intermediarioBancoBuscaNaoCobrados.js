const intermediarioBancoBuscaNaoCobrados = (joiSchema) => async (req, res, next) => {
    const { feiras_id, locacoes_id } = req.body;

    try {
        await joiSchema.validateAsync({
            feiras_id,
            locacoes_id
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioBancoBuscaNaoCobrados;