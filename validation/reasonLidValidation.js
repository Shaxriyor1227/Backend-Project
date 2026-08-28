const Joi = require("joi");

const createReasonLidValidationSchema = Joi.object({
    reason_lid: Joi.string().min(2).max(200).required(),
});

const updateReasonLidValidationSchema = Joi.object({
    reason_lid: Joi.string().min(2).max(200).optional(),
});

module.exports = {
    createReasonLidValidationSchema,
    updateReasonLidValidationSchema,
};
