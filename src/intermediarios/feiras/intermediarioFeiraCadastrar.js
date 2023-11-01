const intermediarioFeiraCadastrar = (joiSchema) => async (req, res, next) => {
    const { nome } = req.body;

    try {
        await joiSchema.validateAsync({
            nome
        });

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioFeiraCadastrar;