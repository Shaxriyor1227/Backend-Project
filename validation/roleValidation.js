const Joi = require("joi");

const createRoleValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
});

const updateRoleValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
});

module.exports = {
    createRoleValidationSchema,
    updateRoleValidationSchema,
};
