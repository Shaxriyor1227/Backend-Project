const Joi = require("joi");

const createGroupStuffValidationSchema = Joi.object({
    group_id: Joi.string().required(),
    stuff_id: Joi.string().required(),
});

const updateGroupStuffValidationSchema = Joi.object({
    group_id: Joi.string().optional(),
    stuff_id: Joi.string().optional(),
});

module.exports = {
    createGroupStuffValidationSchema,
    updateGroupStuffValidationSchema,
};
