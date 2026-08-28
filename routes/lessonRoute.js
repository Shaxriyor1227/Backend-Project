const { Router } = require("express");
const lesson = Router();

const {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
    searchLesson,
} = require("../controllers/lesson.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createLessonValidationSchema,
    updateLessonValidationSchema,
} = require("../validation/lessonValidation");

/**
 * @swagger
 * tags:
 *   name: Lesson
 *   description: Darslarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /lesson/create:
 *   post:
 *     summary: Yangi dars yaratish
 *     tags: [Lesson]
 *     description: Guruh uchun yangi dars yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lesson_theme
 *               - lesson_number
 *               - group_id
 *               - lesson_date
 *             properties:
 *               lesson_theme:
 *                 type: string
 *                 description: Dars mavzusi
 *               lesson_number:
 *                 type: integer
 *                 description: Dars tartib raqami
 *               group_id:
 *                 type: string
 *                 description: Guruhning ID si (MongoDB ObjectId)
 *               lesson_date:
 *                 type: string
 *                 format: date
 *                 description: Dars o'tiladigan sana
 *     responses:
 *       "201":
 *         description: Dars muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
lesson.post("/create", validateSchema(createLessonValidationSchema), createLesson);

/**
 * @swagger
 * /lesson/getAll:
 *   get:
 *     summary: Barcha darslarni olish
 *     tags: [Lesson]
 *     description: Barcha mavjud darslar ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: Darslar ro'yxati muvaffaqiyatli olindi
 *       "500":
 *         description: Ichki server xatosi
 */
lesson.get("/getAll", getAllLessons);

/**
 * @swagger
 * /lesson/getById/{id}:
 *   get:
 *     summary: ID orqali bitta darsni olish
 *     tags: [Lesson]
 *     description: Berilgan ID ga mos darsni qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Darsning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Dars topildi
 *       "404":
 *         description: Dars topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lesson.get("/getById/:id", getLessonById);

/**
 * @swagger
 * /lesson/update/{id}:
 *   put:
 *     summary: Dars ma'lumotlarini yangilash
 *     tags: [Lesson]
 *     description: ID orqali berilgan dars ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan darsning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_theme:
 *                 type: string
 *                 description: Yangi mavzu
 *               lesson_number:
 *                 type: integer
 *                 description: Yangi dars raqami
 *               group_id:
 *                 type: string
 *                 description: Yangi guruh ID si
 *               lesson_date:
 *                 type: string
 *                 format: date
 *                 description: Yangi sana
 *     responses:
 *       "200":
 *         description: Dars muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi
 *       "404":
 *         description: Dars topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lesson.put("/update/:id", validateSchema(updateLessonValidationSchema), updateLesson);

/**
 * @swagger
 * /lesson/delete/{id}:
 *   delete:
 *     summary: Darsni o'chirish
 *     tags: [Lesson]
 *     description: ID orqali darsni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan darsning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Dars muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Dars topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lesson.delete("/delete/:id", deleteLesson);

/**
 * @swagger
 * /lesson/search:
 *   get:
 *     summary: Darslarni mavzu bo'yicha qidirish
 *     tags: [Lesson]
 *     description: Mavzu nomiga qarab darslarni qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Qidiruv matni
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari olindi
 *       "400":
 *         description: Noto'g'ri qidiruv so'rovi
 *       "500":
 *         description: Ichki server xatosi
 */
lesson.get("/search", searchLesson);

module.exports = { lesson };
