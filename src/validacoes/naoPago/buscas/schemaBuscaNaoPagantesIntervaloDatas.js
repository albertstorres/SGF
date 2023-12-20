const joi = require("joi");

const schemaBuscaNaoPagantesIntervaloDatas = joi.object({
    diaInicio: joi.number().required().min(1).max(31).messages({
        "any.required": "O campo dia inicial é obrigatório",
        "number.base": "O campo dia inicial deve ser numérico",
        "number.min": "Dia inválido. Deve ser de 01 a 31.",
        "number.max": "Dia inválido. Deve ser de 01 a 31."
    }),
    mesInicio: joi.number().required().min(1).max(12).messages({
        "any.required": "O campo mês inicial é obrigatório",
        "number.base": "O campo mês inicial deve ser numérico",
        "number.min": "Mês inválido. Deve ser de 01 a 12.",
        "number.max": "Mês inválido. Deve ser de 01 a 12."
    }),
    anoInicio: joi.number().required().min(2023).messages({
        "any.required": "O campo ano inicial é obrigatório",
        "number.base": "O campo ano inicial deve ser numérico",
        "number.min": "Ano inválido. Só temos registros a partir de 2023"
    }),
    diaFinal: joi.number().required().min(1).max(31).messages({
        "any.required": "O campo dia final é obrigatório",
        "number.base": "O campo dia final deve ser numérico",
        "number.min": "Dia inválido. Deve ser de 01 a 31.",
        "number.max": "Dia inválido. Deve ser de 01 a 31."
    }),
    mesFinal: joi.number().required().min(1).max(12).messages({
        "any.required": "O campo mês final é obrigatório",
        "number.base": "O campo mês final deve ser numérico",
        "number.min": "Mês inválido. Deve ser de 01 a 12.",
        "number.max": "Mês inválido. Deve ser de 01 a 12."
    }),
    anoFinal: joi.number().required().min(2023).messages({
        "any.required": "O campo ano final é obrigatório",
        "number.base": "O campo ano final deve ser numérico",
        "number.min": "Ano inválido. Só temos registros a partir de 2023"
    }),
    feiras_id: joi.number().required().messages({
        "any.required": "O campo feiras_id é obrigatório",
        "number.base": "O campo feiras_id deve ser numérico"
    })
});


module.exports = schemaBuscaNaoPagantesIntervaloDatas;