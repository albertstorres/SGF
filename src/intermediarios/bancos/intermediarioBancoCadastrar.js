const intermediarioBancoCadastrar = (joiSchema) => async (req, res, next) => {
    const { nome, feiras_id, clientes_id } = req.body;

    try {
        await joiSchema.validateAsync({
            nome,
            feiras_id,
            clientes_id
        });

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }

}


module.exports = intermediarioBancoCadastrar;