const intermediarioFeiraBuscaGeral = (joiSchema) => async (req, res, next) => {
    const { feiras_id, feiras_nome } = req.body;

    try {
        await joiSchema.validateAsync({
            feiras_id,
            feiras_nome
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioFeiraBuscaGeral; 