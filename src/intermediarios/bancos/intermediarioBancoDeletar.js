const intermediarioBancoDeletar = (joiSchema) => async (req, res, next) => {
    const { id, feiras_id } = req.body;

    try {
        await joiSchema.validateAsync({
            id,
            feiras_id
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioBancoDeletar;