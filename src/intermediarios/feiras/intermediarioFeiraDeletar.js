const intermediarioFeiraDeletar = (joiSchema) => async (req, res, next) => {
    const { id, nome } = req.body;

    try {
        await joiSchema.validateAsync({
            id,
            nome
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioFeiraDeletar;