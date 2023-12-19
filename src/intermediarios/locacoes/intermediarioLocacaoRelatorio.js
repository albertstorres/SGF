const intermediarioLocacaoRelatorio = (joischema) => async (req, res, next) => {
    const { locacoes_id, feiras_id } = req.body;

    try {
        await joischema.validateAsync({
            locacoes_id,
            feiras_id
        });

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }

}


module.exports = intermediarioLocacaoRelatorio;