const intermediarioBancoBuscaGeral = (joiSchema) => async (req, res, next) => {
    const { bancos_id, bancos_nome } = req.body;

    try {
        await joiSchema.validateAsync({
            bancos_id,
            bancos_nome
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioBancoBuscaGeral;