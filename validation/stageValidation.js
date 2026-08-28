const Joi = require("joi");

const createStageValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
});

const updateStageValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
});

module.exports = {
    createStageValidationSchema,
    updateStageValidationSchema,
};
