const intermediarioUsuarioCadastrar = (joiSchema) => async (req, res, next) => {
    const { nome, username, senha } = req.body;

    try {
        await joiSchema.validateAsync({
            nome,
            username,
            senha
        });

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }

}


module.exports = intermediarioUsuarioCadastrar;