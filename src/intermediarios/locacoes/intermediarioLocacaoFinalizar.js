const intermediarioLocacaoFinalizar = (joiSchema) => async (req, res, next) => {
    const { locacoes_id } = req.body;

    try {
        await joiSchema.validateAsync({
            locacoes_id
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioLocacaoFinalizar;