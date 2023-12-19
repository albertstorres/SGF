const joi = require("joi");

const schemaClienteCadastrar = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
        "string.base": "O campo nome não pode ser numérico",
    }),
    cpf: joi.string().required().min(14).max(14).messages({
        "any.required": "O campo cpf é obrigatório",
        "string.empty": "O campo cpf é obrigatório",
        "string.min": "Número mínimo de caracteres não foi obtido",
        "string.max": "Número máximo de caracteres superado",
    }),
    cep: joi.string().min(10).max(10).messages({
        "string.min": "Número mínimo de caracteres não foi obtido",
        "string.max": "Número máximo de caracteres superado",
    }),
    rua: joi.string().messages({
        "string.base": "O campo rua não deve ser numérico",
    }),
    bairro: joi.string().messages({
        "string.base": "O campo bairro não deve ser numérico",
    }),
    numero: joi.string().messages({
        "string.base": "O campo número deve ser string."
    }),

    cidade: joi.string().messages({
        "string.base": "O campo cidade não deve ser numérico",
    }),
    estado: joi.string().min(2).max(2).messages({
        "string.min": "O campo estado deve ter dois caracteres",
        "string.max": "O campo estado deve ter dois caracteres",
    }),
    feiras_id: joi.number().messages({
        "number.base": "O campo feiras_id deve ser numérico"
    })
});


module.exports = schemaClienteCadastrar;