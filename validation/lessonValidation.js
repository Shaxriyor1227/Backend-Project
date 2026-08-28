const Joi = require("joi");

const createLessonValidationSchema = Joi.object({
    lesson_theme: Joi.string().min(2).max(200).required(),
    lesson_number: Joi.number().integer().min(1).required(),
    group_id: Joi.string().required(),
    lesson_date: Joi.date().iso().required(),
});

const updateLessonValidationSchema = Joi.object({
    lesson_theme: Joi.string().min(2).max(200).optional(),
    lesson_number: Joi.number().integer().min(1).optional(),
    group_id: Joi.string().optional(),
    lesson_date: Joi.date().iso().optional(),
});

module.exports = {
    createLessonValidationSchema,
    updateLessonValidationSchema,
};
