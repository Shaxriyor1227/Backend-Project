const Joi = require("joi");

const registerValidationSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(30),
    lastName: Joi.string().required().min(3).max(30),
    phoneNumber: Joi.string().required().min(10).max(18),
    login: Joi.string().required().min(3).max(30),
    parol: Joi.string()
           .required()
           .min(8)
           .max(30)
           .pattern(
               /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
           ),
});

const updateStuffValidationSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().min(10).max(18),
    parol: Joi.string()
           .min(8)
           .max(30)
           .pattern(
               /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
           ).optional(),
});

const loginValidationSchema = Joi.object({
    login: Joi.string().required().min(3).max(30),
    parol: Joi.string()
           .required()
           .min(6)
           .pattern(
               /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
           )
});

module.exports = { registerValidationSchema, updateStuffValidationSchema, loginValidationSchema };