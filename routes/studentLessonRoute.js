const { Router } = require("express");
const studentLesson = Router();

const {
    createStudentLesson,
    getAllStudentLessons,
    getStudentLessonById,
    updateStudentLesson,
    deleteStudentLesson,
} = require("../controllers/studentLesson.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createStudentLessonValidationSchema,
    updateStudentLessonValidationSchema,
} = require("../validation/studentLessonValidation");

/**
 * @swagger
 * tags:
 *   name: StudentLesson
 *   description: O'quvchi dars davomati va to'lovlarini boshqarish API endpointlari
 */

/**
 * @swagger
 * /student-lesson/create:
 *   post:
 *     summary: Dars davomatini yaratish
 *     tags: [StudentLesson]
 *     description: O'quvchining darsdagi davomatini va to'lov holatini saqlash
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lesson_id
 *               - student_id
 *             properties:
 *               lesson_id:
 *                 type: string
 *                 description: Darsning ID si (MongoDB ObjectId)
 *               student_id:
 *                 type: string
 *                 description: O'quvchining ID si (MongoDB ObjectId)
 *               is_there:
 *                 type: boolean
 *                 description: O'quvchi darsda qatnashdimi yoki yo'qmi
 *               reason:
 *                 type: string
 *                 description: Qatnashmagan bo'lsa sababi
 *               be_paid:
 *                 type: boolean
 *                 description: Dars uchun to'lov qilinganmi
 *     responses:
 *       "201":
 *         description: Davomat muvaffaqiyatli saqlandi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday yozuv mavjud
 *       "500":
 *         description: Ichki server xatosi
 */
studentLesson.post("/create", validateSchema(createStudentLessonValidationSchema), createStudentLesson);

/**
 * @swagger
 * /student-lesson/getAll:
 *   get:
 *     summary: Barcha davomat yozuvlarini olish
 *     tags: [StudentLesson]
 *     description: Barcha o'quvchi-dars davomat yozuvlarining to'liq ro'yxati
 *     responses:
 *       "200":
 *         description: Ma'lumotlar muvaffaqiyatli olindi
 *       "500":
 *         description: Ichki server xatosi
 */
studentLesson.get("/getAll", getAllStudentLessons);

/**
 * @swagger
 * /student-lesson/getById/{id}:
 *   get:
 *     summary: ID orqali bitta davomat yozuvini olish
 *     tags: [StudentLesson]
 *     description: ID orqali o'quvchi davomati ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Davomat yozuvining ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Davomat ma'lumoti topildi
 *       "404":
 *         description: Ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
studentLesson.get("/getById/:id", getStudentLessonById);

/**
 * @swagger
 * /student-lesson/update/{id}:
 *   put:
 *     summary: Davomat ma'lumotlarini yangilash
 *     tags: [StudentLesson]
 *     description: ID orqali davomat, sabab yoki to'lov holatini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan yozuvning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *               student_id:
 *                 type: string
 *               is_there:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Davomat muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki dublikat yozuv
 *       "404":
 *         description: Ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
studentLesson.put("/update/:id", validateSchema(updateStudentLessonValidationSchema), updateStudentLesson);

/**
 * @swagger
 * /student-lesson/delete/{id}:
 *   delete:
 *     summary: Davomat yozuvini o'chirish
 *     tags: [StudentLesson]
 *     description: ID orqali davomat yozuvini o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan yozuvning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Davomat yozuvi muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
studentLesson.delete("/delete/:id", deleteStudentLesson);

module.exports = { studentLesson };
