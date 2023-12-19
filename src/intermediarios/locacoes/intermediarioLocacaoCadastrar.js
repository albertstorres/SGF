const intermediarioLocacaoCadastrar = (joiSchema) => async (req, res, next) => {
    const { situacao } = req.body;

    try {
        await joiSchema.validateAsync({
            situacao
        });

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }

}


module.exports = intermediarioLocacaoCadastrar;