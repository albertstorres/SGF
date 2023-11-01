const joi = require("joi");

const schemaBancoCadastrar = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
        "string.base": "O campo nome deve ser string"
    }),
    feiras_id: joi.number().required().messages({
        "any.required": "O campo feira_id é obrigatório",
        "number.base": "O campo feira_id deve ser uma valor numérico",
    }),
    clientes_id: joi.number().required().messages({
        "any.required": "O campo cliente_id é obrigatório",
        "number.base": "O campo cliente_id deve ser uma valor numérico",
    })
});


module.exports = schemaBancoCadastrar;