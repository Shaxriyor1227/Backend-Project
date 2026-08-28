const { Router } = require("express");
const lid = Router();

const {
    createLid,
    getAllLids,
    getLidById,
    updateLid,
    deleteLid,
    searchLid,
} = require("../controllers/lid.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createLidValidationSchema,
    updateLidValidationSchema,
} = require("../validation/lidValidation");

/**
 * @swagger
 * tags:
 *   name: Lid
 *   description: Lid (Mijozlar/Lidlar) bilan ishlash uchun API endpointlari
 */

/**
 * @swagger
 * /lid/create:
 *   post:
 *     summary: Yangi lid yaratish
 *     tags: [Lid]
 *     description: Yangi lid (potentsial mijoz) ma'lumotlarini kiritish
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
 *               first_name:
 *                 type: string
 *                 description: Mijozning ismi
 *               last_name:
 *                 type: string
 *                 description: Mijozning familiyasi
 *               phone_number:
 *                 type: string
 *                 description: Telefon raqami
 *               lid_stage_id:
 *                 type: string
 *                 description: Bosqich ID si (MongoDB ObjectId)
 *               test_date:
 *                 type: string
 *                 format: date
 *                 description: Sinov sanasi
 *               trial_lesson_date:
 *                 type: string
 *                 format: date
 *                 description: Sinov darsi sanasi
 *               trial_lesson_time:
 *                 type: string
 *                 description: Sinov darsi vaqti
 *               trial_lesson_group_id:
 *                 type: string
 *                 description: Sinov darsi guruhi ID si (MongoDB ObjectId)
 *               lid_status_id:
 *                 type: string
 *                 description: Lid statusi ID si
 *               cancel_reson_id:
 *                 type: string
 *                 description: Bekor qilish sababi ID si
 *     responses:
 *       "201":
 *         description: Lid muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
lid.post("/create", validateSchema(createLidValidationSchema), createLid);

/**
 * @swagger
 * /lid/getAll:
 *   get:
 *     summary: Barcha lidlarni olish
 *     tags: [Lid]
 *     description: Barcha lidlar ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: Lidlar ro'yxati olindi
 *       "500":
 *         description: Ichki server xatosi
 */
lid.get("/getAll", getAllLids);

/**
 * @swagger
 * /lid/getById/{id}:
 *   get:
 *     summary: ID orqali bitta lidni olish
 *     tags: [Lid]
 *     description: Berilgan ID ga mos keluvchi lid ma'lumotlarini qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lidning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Lid topildi
 *       "404":
 *         description: Lid topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lid.get("/getById/:id", getLidById);

/**
 * @swagger
 * /lid/update/{id}:
 *   put:
 *     summary: Lid ma'lumotlarini yangilash
 *     tags: [Lid]
 *     description: ID orqali lid ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan lidning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: string
 *               lid_status_id:
 *                 type: string
 *               cancel_reson_id:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Lid muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi
 *       "404":
 *         description: Lid topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lid.put("/update/:id", validateSchema(updateLidValidationSchema), updateLid);

/**
 * @swagger
 * /lid/delete/{id}:
 *   delete:
 *     summary: Lidni o'chirish
 *     tags: [Lid]
 *     description: ID orqali lidni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan lidning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Lid muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Lid topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lid.delete("/delete/:id", deleteLid);

/**
 * @swagger
 * /lid/search:
 *   get:
 *     summary: Lidlarni qidirish
 *     tags: [Lid]
 *     description: Ism, familiya yoki telefon raqami bo'yicha lidlarni qidirish
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
lid.get("/search", searchLid);

module.exports = { lid };
