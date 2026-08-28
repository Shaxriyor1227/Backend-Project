const Joi = require("joi");

const createBranchValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    address: Joi.string().min(3).max(200).required(),
    call_number: Joi.string().min(5).max(30).required(),
});

const updateBranchValidationSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    address: Joi.string().min(3).max(200).optional(),
    call_number: Joi.string().min(5).max(30).optional(),
});

module.exports = {
    createBranchValidationSchema,
    updateBranchValidationSchema,
};
