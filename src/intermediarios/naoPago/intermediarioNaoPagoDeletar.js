const intermediarioNaoPagoDeletar = (joiSchema) => async (req, res, next) => {
    const { bancos_id, feiras_id, locacoes_id } = req.body;

    try {
        await joiSchema.validateAsync({
            bancos_id,
            feiras_id,
            locacoes_id
        });

        next();

    } catch (error) {
        return res.status(404).json(error.message);
    }
}


module.exports = intermediarioNaoPagoDeletar;