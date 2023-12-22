const joi = require("joi");

const schemaLocacaoFinalizar = joi.object({
    locacoes_id: joi.number().required().messages({
        "any.required": "O campo LOCACOES_ID é obrigatório.",
        "number.base": "O campo LOCACOES_ID deve ser numérico"
    })
});


module.exports = schemaLocacaoFinalizar;