const joi = require("joi");

const schemaPagoDeletar = joi.object({
    bancos_id: joi.number().required().messages({
        "any.required": "O campo BANCOS_ID é obrigatório.",
        "number.base": "O campo BANCOS_ID deve ser numérico."
    }),
    feiras_id: joi.number().required().messages({
        "any.required": "O campo FEIRAS_ID é obrigatório.",
        "number.base": "O campo FEIRAS_ID deve ser numérico."
    }),
    locacoes_id: joi.number().required().messages({
        "any.required": "O campo LOCACOES_ID é obrigatório.",
        "number.base": "O campo LOCACOES_ID é obrigatório."
    })
});


module.exports = schemaPagoDeletar;