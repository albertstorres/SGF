const joi = require("joi");

const schemaBancoBuscaGeral = joi.object({
    bancos_id: joi.number().required().messages({
        "any.required": "O campo BANCO_ID é obrigatório.",
        "number.base": "O campo BANCOS_ID é obrigatório.",
    }),
    bancos_nome: joi.string().required().messages({
        "any.required": "O campo BANCOS_NOME é obrigatório.",
        "string.empty": "O campo BANCOS_NOME é obrigatório.",
    })
});


module.exports = schemaBancoBuscaGeral;