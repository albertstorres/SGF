const intermediarioUsuarioLogin = (joiSchema) => async (req, res, next) => {
    const { username, senha } = req.body;

    try {
        await joiSchema.validateAsync({
            username,
            senha
        });

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }

}


module.exports = intermediarioUsuarioLogin;