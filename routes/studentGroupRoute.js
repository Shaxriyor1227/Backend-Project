const { Router } = require("express");
const studentGroup = Router();

const {
    createStudentGroup,
    getAllStudentGroups,
    getStudentGroupById,
    updateStudentGroup,
    deleteStudentGroup,
} = require("../controllers/studentGroup.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createStudentGroupValidationSchema,
    updateStudentGroupValidationSchema,
} = require("../validation/studentGroupValidation");

/**
 * @swagger
 * tags:
 *   name: StudentGroup
 *   description: O'quvchi va guruhlar o'rtasidagi bog'lanishlarni boshqarish API endpointlari
 */

/**
 * @swagger
 * /student-group/create:
 *   post:
 *     summary: O'quvchini guruhga biriktirish
 *     tags: [StudentGroup]
 *     description: O'quvchi va guruh o'rtasida yangi bog'lanish yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - group_id
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: O'quvchining ID si (MongoDB ObjectId)
 *               group_id:
 *                 type: string
 *                 description: Guruhning ID si (MongoDB ObjectId)
 *     responses:
 *       "201":
 *         description: O'quvchi guruhga muvaffaqiyatli biriktirildi
 *       "400":
 *         description: Validatsiya xatosi yoki bu o'quvchi allaqachon mazkur guruhga biriktirilgan
 *       "500":
 *         description: Ichki server xatosi
 */
studentGroup.post("/create", validateSchema(createStudentGroupValidationSchema), createStudentGroup);

/**
 * @swagger
 * /student-group/getAll:
 *   get:
 *     summary: Barcha o'quvchi-guruh bog'lanishlarini olish
 *     tags: [StudentGroup]
 *     description: Barcha biriktirilgan o'quvchi va guruhlarning to'liq ro'yxati
 *     responses:
 *       "200":
 *         description: Ma'lumotlar muvaffaqiyatli olindi
 *       "500":
 *         description: Ichki server xatosi
 */
studentGroup.get("/getAll", getAllStudentGroups);

/**
 * @swagger
 * /student-group/getById/{id}:
 *   get:
 *     summary: ID orqali bitta bog'lanishni olish
 *     tags: [StudentGroup]
 *     description: ID orqali o'quvchi-guruh bog'lanishini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Bog'lanish yozuvining ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Bog'lanish ma'lumoti topildi
 *       "404":
 *         description: Ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
studentGroup.get("/getById/:id", getStudentGroupById);

/**
 * @swagger
 * /student-group/update/{id}:
 *   put:
 *     summary: O'quvchi-guruh bog'lanishini yangilash
 *     tags: [StudentGroup]
 *     description: ID orqali o'quvchi yoki guruh ID larini o'zgartirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan bog'lanish ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: Yangi o'quvchi ID si
 *               group_id:
 *                 type: string
 *                 description: Yangi guruh ID si
 *     responses:
 *       "200":
 *         description: Bog'lanish muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki dublikat yozuv
 *       "404":
 *         description: Ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
studentGroup.put("/update/:id", validateSchema(updateStudentGroupValidationSchema), updateStudentGroup);

/**
 * @swagger
 * /student-group/delete/{id}:
 *   delete:
 *     summary: O'quvchini guruhdan ajratish / o'chirish
 *     tags: [StudentGroup]
 *     description: ID orqali o'quvchi-guruh bog'lanishini o'chiradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan bog'lanish ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: O'quvchi guruhdan muvaffaqiyatli ajratildi
 *       "404":
 *         description: Ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
studentGroup.delete("/delete/:id", deleteStudentGroup);

module.exports = { studentGroup };
