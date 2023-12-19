const joi = require("joi");

const schemaBancoDeletar = joi.object({
    id: joi.number().required().messages({
        "any.required": "O campo ID é obrigatório.",
        "number.base": "O campo ID deve ser numérico."
    }),
    feiras_id: joi.number().required().messages({
        "any.required": "O campo FEIRAS_ID é obrigatório.",
        "number.base": "O campo FEIRAS_ID deve ser numérico."
    })
});


module.exports = schemaBancoDeletar;