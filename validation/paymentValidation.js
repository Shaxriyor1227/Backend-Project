const Joi = require("joi");

const createPaymentValidationSchema = Joi.object({
    student_id: Joi.string().required(),
    payment_last_date: Joi.date().iso().optional().allow(null, ""),
    payment_date: Joi.date().iso().optional().allow(null, ""),
    price: Joi.number().min(0).required(),
    is_paid: Joi.boolean().optional(),
    total_attent: Joi.number().integer().min(0).optional().allow(null),
});

const updatePaymentValidationSchema = Joi.object({
    student_id: Joi.string().optional(),
    payment_last_date: Joi.date().iso().optional().allow(null, ""),
    payment_date: Joi.date().iso().optional().allow(null, ""),
    price: Joi.number().min(0).optional(),
    is_paid: Joi.boolean().optional(),
    total_attent: Joi.number().integer().min(0).optional().allow(null),
});

module.exports = {
    createPaymentValidationSchema,
    updatePaymentValidationSchema,
};
