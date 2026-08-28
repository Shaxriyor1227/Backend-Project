const { Router } = require("express");
const group = Router();

const {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
    searchGroup,
} = require("../controllers/group.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createGroupValidationSchema,
    updateGroupValidationSchema,
} = require("../validation/groupValidation");

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: Guruhlarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /group/create:
 *   post:
 *     summary: Yangi guruh yaratish
 *     tags: [Group]
 *     description: Yangi o'quv guruhini yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - group_name
 *               - lesson_start_time
 *               - lesson_continuous
 *               - lesson_week_day
 *               - room_number
 *               - room_floor
 *               - lessons_quant
 *             properties:
 *               group_name:
 *                 type: string
 *                 description: Guruh nomi
 *               lesson_start_time:
 *                 type: string
 *                 description: Dars boshlanish vaqti
 *               lesson_continuous:
 *                 type: string
 *                 description: Dars davomiyligi
 *               lesson_week_day:
 *                 type: string
 *                 description: Dars kunlari
 *               group_stage_id:
 *                 type: string
 *                 description: Guruh bosqichi ID si (MongoDB ObjectId)
 *               room_number:
 *                 type: string
 *                 description: Xona raqami
 *               room_floor:
 *                 type: integer
 *                 description: Xona qavati
 *               branch_id:
 *                 type: string
 *                 description: Filial ID si (MongoDB ObjectId)
 *               lessons_quant:
 *                 type: integer
 *                 description: Darslar umumiy soni
 *               is_active:
 *                 type: boolean
 *                 description: Guruh faolligi
 *     responses:
 *       "201":
 *         description: Guruh muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday nomdagi guruh mavjud
 *       "500":
 *         description: Ichki server xatosi
 */
group.post("/create", validateSchema(createGroupValidationSchema), createGroup);

/**
 * @swagger
 * /group/getAll:
 *   get:
 *     summary: Barcha guruhlarni olish
 *     tags: [Group]
 *     description: Barcha o'quv guruhlari ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: Guruhlar ro'yxati muvaffaqiyatli olindi
 *       "500":
 *         description: Ichki server xatosi
 */
group.get("/getAll", getAllGroups);

/**
 * @swagger
 * /group/getById/{id}:
 *   get:
 *     summary: ID orqali bitta guruhni olish
 *     tags: [Group]
 *     description: Berilgan ID ga mos keluvchi guruhni qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Guruhning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Guruh topildi
 *       "404":
 *         description: Guruh topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
group.get("/getById/:id", getGroupById);

/**
 * @swagger
 * /group/update/{id}:
 *   put:
 *     summary: Guruh ma'lumotlarini yangilash
 *     tags: [Group]
 *     description: ID orqali berilgan guruh ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan guruhning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name:
 *                 type: string
 *               lesson_start_time:
 *                 type: string
 *               lesson_continuous:
 *                 type: string
 *               lesson_week_day:
 *                 type: string
 *               group_stage_id:
 *                 type: string
 *               room_number:
 *                 type: string
 *               room_floor:
 *                 type: integer
 *               branch_id:
 *                 type: string
 *               lessons_quant:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Guruh ma'lumotlari muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday nomdagi guruh mavjud
 *       "404":
 *         description: Guruh topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
group.put("/update/:id", validateSchema(updateGroupValidationSchema), updateGroup);

/**
 * @swagger
 * /group/delete/{id}:
 *   delete:
 *     summary: Guruhni o'chirish
 *     tags: [Group]
 *     description: ID orqali guruhni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan guruhning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Guruh muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Guruh topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
group.delete("/delete/:id", deleteGroup);

/**
 * @swagger
 * /group/search:
 *   get:
 *     summary: Guruhlarni qidirish
 *     tags: [Group]
 *     description: Guruh nomi, xona raqami yoki kunlari bo'yicha qidirish
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
group.get("/search", searchGroup);

module.exports = { group };
