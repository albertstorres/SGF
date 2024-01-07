const joi = require("joi");

const schemaBancoBuscaNaoCobrados = joi.object({
    feiras_id: joi.number().required().messages({
        "any.required": "O campo FEIRAS_ID é obrigatório.",
        "number.base": "O campo FEIRAS_ID deve ser numérico."
    }),
    locacoes_id: joi.number().required().messages({
        "any.required": "O campo LOCACOES_ID é obrigatório.",
        "number.base": "O campo LOCACOES_ID deve ser numérico"
    })
});


module.exports = schemaBancoBuscaNaoCobrados;