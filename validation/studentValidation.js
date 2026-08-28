const Joi = require("joi");

const createStudentValidationSchema = Joi.object({
    lid_id: Joi.string().optional().allow(null, ""),
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    phone_number: Joi.string().min(7).max(20).required(),
    bithday: Joi.date().iso().optional().allow(null, ""),
    gender: Joi.string().optional().allow(null, ""),
});

const updateStudentValidationSchema = Joi.object({
    lid_id: Joi.string().optional().allow(null, ""),
    first_name: Joi.string().min(2).max(50).optional(),
    last_name: Joi.string().min(2).max(50).optional(),
    phone_number: Joi.string().min(7).max(20).optional(),
    bithday: Joi.date().iso().optional().allow(null, ""),
    gender: Joi.string().optional().allow(null, ""),
});

module.exports = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
