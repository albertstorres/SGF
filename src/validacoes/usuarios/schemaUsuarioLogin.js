const joi = require("joi");

const schemaUsuarioLogin = joi.object({
    username: joi.string().required().messages({
        "any.required": "O campo username é obrigatório",
        "string.empty": "O campo username é obrigatório",
        "string.base": "O campo username deve ser do tipo string",
    }),
    senha: joi.string().required().messages({
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha é obrigatório",
        "string.base": "O campo senha deve ser do tipo string",
    })
});


module.exports = schemaUsuarioLogin;