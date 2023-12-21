const intermediarioPagoDeletar = (joiSchema) => async (req, res, next) => {
    const { bancos_id, feiras_id, locacoes_id, foto } = req.body;

    try {
        await joiSchema.validateAsync({
            bancos_id,
            feiras_id,
            locacoes_id
        });

        next();

    } catch (error) {
        return res.status(401).json(error.message);
    }
}


module.exports = intermediarioPagoDeletar;