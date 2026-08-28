const Joi = require("joi");

const createGroupValidationSchema = Joi.object({
    group_name: Joi.string().min(2).max(100).required(),
    lesson_start_time: Joi.string().required(),
    lesson_continuous: Joi.string().required(),
    lesson_week_day: Joi.string().required(),
    group_stage_id: Joi.string().optional().allow(null, ""),
    room_number: Joi.string().required(),
    room_floor: Joi.number().integer().required(),
    branch_id: Joi.string().optional().allow(null, ""),
    lessons_quant: Joi.number().integer().min(0).required(),
    is_active: Joi.boolean().optional(),
});

const updateGroupValidationSchema = Joi.object({
    group_name: Joi.string().min(2).max(100).optional(),
    lesson_start_time: Joi.string().optional(),
    lesson_continuous: Joi.string().optional(),
    lesson_week_day: Joi.string().optional(),
    group_stage_id: Joi.string().optional().allow(null, ""),
    room_number: Joi.string().optional(),
    room_floor: Joi.number().integer().optional(),
    branch_id: Joi.string().optional().allow(null, ""),
    lessons_quant: Joi.number().integer().min(0).optional(),
    is_active: Joi.boolean().optional(),
});

module.exports = {
    createGroupValidationSchema,
    updateGroupValidationSchema,
};
