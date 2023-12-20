const joi = require("joi");

const schemaFeiraBuscaGeral = joi.object({
    feiras_id: joi.number().required().messages({
        "any.required": "O campo FEIRAS_ID é obrigatório.",
        "number.base": "O campo FEIRAS_ID deve ser numérico."
    }),
    feiras_nome: joi.string().required().messages({
        "any.required": "O campo FEIRAS_NOME é obrigatório.",
        "string.base": "O campo FEIRAS_NOME deve ser string"
    })
});


module.exports = schemaFeiraBuscaGeral;