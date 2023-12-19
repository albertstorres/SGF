const intermediarioClienteAtualizar = (joiSchema) => async (req, res, next) => {
    const { cpf } = req.body;

    try {
        await joiSchema.validateAsync({
            cpf
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioClienteAtualizar;