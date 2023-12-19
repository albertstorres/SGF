const intermediarioClienteCadastrar = (joiSchema) => async (req, res, next) => {
    const { nome, cpf, cep, rua, bairro, numero, cidade, estado, feiras_id } = req.body;

    try {
        await joiSchema.validateAsync({
            nome,
            cpf,
            cep,
            rua,
            bairro,
            numero,
            cidade,
            estado,
            feiras_id
        });

        next();
    } catch (error) {
        return res.status(404).json(error.message);
    }

}


module.exports = intermediarioClienteCadastrar;