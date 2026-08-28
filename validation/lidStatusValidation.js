const Joi = require("joi");

const createLidStatusValidationSchema = Joi.object({
    status: Joi.string().min(2).max(50).required(),
});

const updateLidStatusValidationSchema = Joi.object({
    status: Joi.string().min(2).max(50).optional(),
});

module.exports = {
    createLidStatusValidationSchema,
    updateLidStatusValidationSchema,
};
