const joi = require("joi");

const schemaLocacaoCobrar = joi.object({
    locacoes_id: joi.number().required().messages({
        "any.required": "O campo locacoes_id é obrigatório.",
        "number.base": "O campo locacoes_id dever ser numérico."
    }),
    feiras_id: joi.number().required().messages({
        "any.required": "O campo feiras_id é obrigatório.",
        "number.base": "O campo feiras_id deve ser numérico."
    })
});



module.exports = schemaLocacaoCobrar;