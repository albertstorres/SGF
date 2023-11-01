const joi = require("joi");

const schemaPagoCadastrar = joi.object({
    bancos_id: joi.number().required().positive().messages({
        "any.required": "O campo bancos_id é obrigatório",
        "number.base": "O campo bancos_id deve ser numérico",
        "number.positive": "O campo bancos_id deve ser um inteiro positivo"
    }),
    locacoes_id: joi.number().required().positive().messages({
        "any.required": "O campo locacoes_id é obrigatório",
        "number.base": "O campo locacoes_id deve ser numérico",
        "number.positive": "O campo locacoes_id deve ser um inteiro positivo"
    })
});


module.exports = schemaPagoCadastrar;