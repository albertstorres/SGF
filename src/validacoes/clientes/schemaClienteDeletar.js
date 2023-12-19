const joi = require("joi");

const schemaClienteDeletar = joi.object({
    cpf: joi.string().required().min(14).max(14).messages({
        "any.required": "O campo CPF é obriogatório.",
        "string.empty": "O campo CPF é obrigatório.",
        "string.base": "O campo CPF deve ser String.",
        "string.min": "O campo CPF deve ter no mínimo 14 caracteres.",
        "string.max": "O campo CPF deve ter no máximo 14 caracteres."
    })
});


module.exports = schemaClienteDeletar;