const joi = require("joi");

const schemaClienteAtualizar = joi.object({
    cpf: joi.string().required().min(14).max(14).messages({
        "any.required": "O campo CPF é obrigatório.",
        "string.empty": "O campo CPF é obrigatório.",
        "string.base": "O campo CPF deve ser string",
        "string.min": "O campo CPF deve conter no mínimo 14 caracteres.",
        "string.max": "O campo CPF deve conter no máximo 14 caracteres."
    })
});


module.exports = schemaClienteAtualizar;