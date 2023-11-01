const joi = require("joi");

const schemLocacaoCadastrar = joi.object({
    situacao: joi.boolean().required().messages({
        "any.required": "Campo situação é obrigatório",
        "boolean.base": "O campo situação de ser do tipo booleano",
    })
});

module.exports = schemLocacaoCadastrar;