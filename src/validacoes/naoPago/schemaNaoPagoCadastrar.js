const joi = require("joi");

const schemaNaoPagoCadastrar = joi.object({
    bancos_id: joi.number().required().messages({
        "any.required": "O campo bancos_id é obrigatório",
        "number.base": "O campo bancos_id devve ser numérico"
    }),
    locacoes_id: joi.number().required().messages({
        "any.required": "O campo locacoes_id é obrigatório",
        "number.base": "O campo locacoes_id devve ser numérico"
    })
});


module.exports = schemaNaoPagoCadastrar;

