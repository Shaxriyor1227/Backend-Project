const Joi = require("joi");

const createLidValidationSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    phone_number: Joi.string().min(7).max(20).required(),
    lid_stage_id: Joi.string().optional().allow(null, ""),
    test_date: Joi.date().iso().optional().allow(null, ""),
    trial_lesson_date: Joi.date().iso().optional().allow(null, ""),
    trial_lesson_time: Joi.string().optional().allow(null, ""),
    trial_lesson_group_id: Joi.string().optional().allow(null, ""),
    lid_status_id: Joi.string().optional().allow(null, ""),
    cancel_reson_id: Joi.string().optional().allow(null, ""),
});

const updateLidValidationSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).optional(),
    last_name: Joi.string().min(2).max(50).optional(),
    phone_number: Joi.string().min(7).max(20).optional(),
    lid_stage_id: Joi.string().optional().allow(null, ""),
    test_date: Joi.date().iso().optional().allow(null, ""),
    trial_lesson_date: Joi.date().iso().optional().allow(null, ""),
    trial_lesson_time: Joi.string().optional().allow(null, ""),
    trial_lesson_group_id: Joi.string().optional().allow(null, ""),
    lid_status_id: Joi.string().optional().allow(null, ""),
    cancel_reson_id: Joi.string().optional().allow(null, ""),
});

module.exports = {
    createLidValidationSchema,
    updateLidValidationSchema,
};
