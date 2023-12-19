const joi = require("joi");

const schemaFeiraDeletar = joi.object({
    id: joi.number().required().messages({
        "any.required": "O campo ID é obrigatório.",
        "number.base": "O campo ID deve ser numerico."
    }),
    nome: joi.string().required().messages({
        "any.required": "O campo NOME é obrigatório.",
        "string.base": "O campo NOME deve ser string.",
        "string.empty": "O campo NOME é obrigatório."
    })
});


module.exports = schemaFeiraDeletar;