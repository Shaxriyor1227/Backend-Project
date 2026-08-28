const Joi = require("joi");

const createStuffRoleValidationSchema = Joi.object({
    stuff_id: Joi.string().required(),
    role_id: Joi.string().required(),
});

const updateStuffRoleValidationSchema = Joi.object({
    stuff_id: Joi.string().optional(),
    role_id: Joi.string().optional(),
});

module.exports = {
    createStuffRoleValidationSchema,
    updateStuffRoleValidationSchema,
};
