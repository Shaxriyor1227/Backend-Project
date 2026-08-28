const { Router } = require("express");
const students = Router();

const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudent,
} = require("../controllers/student.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createStudentValidationSchema,
    updateStudentValidationSchema,
} = require("../validation/studentValidation");

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: O'quvchilarni (Students) boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /students/create:
 *   post:
 *     summary: Yangi o'quvchi yaratish
 *     tags: [Students]
 *     description: Yangi o'quvchi ma'lumotlarini kiritish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - phone_number
 *             properties:
 *               lid_id:
 *                 type: string
 *                 description: Lidning ID si (MongoDB ObjectId)
 *               first_name:
 *                 type: string
 *                 description: O'quvchining ismi
 *               last_name:
 *                 type: string
 *                 description: O'quvchining familiyasi
 *               phone_number:
 *                 type: string
 *                 description: O'quvchining telefon raqami
 *               bithday:
 *                 type: string
 *                 format: date
 *                 description: Tug'ilgan sana
 *               gender:
 *                 type: string
 *                 description: Jinsi (male / female)
 *     responses:
 *       "201":
 *         description: O'quvchi muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
students.post("/create", validateSchema(createStudentValidationSchema), createStudent);

/**
 * @swagger
 * /students/getAll:
 *   get:
 *     summary: Barcha o'quvchilarni olish
 *     tags: [Students]
 *     description: Barcha mavjud o'quvchilar ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: O'quvchilar ro'yxati olindi
 *       "500":
 *         description: Ichki server xatosi
 */
students.get("/getAll", getAllStudents);

/**
 * @swagger
 * /students/getById/{id}:
 *   get:
 *     summary: ID orqali bitta o'quvchini olish
 *     tags: [Students]
 *     description: Berilgan ID ga mos keluvchi o'quvchini qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'quvchining ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: O'quvchi ma'lumoti topildi
 *       "404":
 *         description: O'quvchi topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
students.get("/getById/:id", getStudentById);

/**
 * @swagger
 * /students/update/{id}:
 *   put:
 *     summary: O'quvchi ma'lumotlarini yangilash
 *     tags: [Students]
 *     description: ID orqali berilgan o'quvchi ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan o'quvchining ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lid_id:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               bithday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *     responses:
 *       "200":
 *         description: O'quvchi muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi
 *       "404":
 *         description: O'quvchi topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
students.put("/update/:id", validateSchema(updateStudentValidationSchema), updateStudent);

/**
 * @swagger
 * /students/delete/{id}:
 *   delete:
 *     summary: O'quvchini o'chirish
 *     tags: [Students]
 *     description: ID orqali o'quvchini o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan o'quvchining ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: O'quvchi muvaffaqiyatli o'chirildi
 *       "404":
 *         description: O'quvchi topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
students.delete("/delete/:id", deleteStudent);

/**
 * @swagger
 * /students/search:
 *   get:
 *     summary: O'quvchilarni qidirish
 *     tags: [Students]
 *     description: Ism, familiya yoki telefon raqami bo'yicha qidirish
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
students.get("/search", searchStudent);

module.exports = { students };
