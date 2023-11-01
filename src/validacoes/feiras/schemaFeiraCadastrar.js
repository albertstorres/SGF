const joi = require("joi");

const schemaFeiraCadastrar = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
        "string.base": "O campo nome não pode ser numérico",
    })
});


module.exports = schemaFeiraCadastrar;