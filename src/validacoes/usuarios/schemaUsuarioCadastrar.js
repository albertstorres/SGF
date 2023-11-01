const joi = require("joi");

const schemaUsuarrioCadastrar = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
        "string.base": "O campo nome náo pode ser numérico",
    }),
    username: joi.string().required().messages({
        "any.required": "O campo username é obrigatório",
        "string.empty": "O campo username é obrigatório",
        "string.base": "O campo username não pode ser numérico",
    }),
    senha: joi.string().required().min(8).messages({
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha é obrigatório",
        "string.min": "A senha deve ter no mínimo 8 caracteres",
    })
});


module.exports = schemaUsuarrioCadastrar;