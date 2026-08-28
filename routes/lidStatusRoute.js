const { Router } = require("express");
const lidStatus = Router();

const {
    createLidStatus,
    getAllLidStatuses,
    getLidStatusById,
    updateLidStatus,
    deleteLidStatus,
    searchLidStatus,
} = require("../controllers/lidStatus.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createLidStatusValidationSchema,
    updateLidStatusValidationSchema,
} = require("../validation/lidStatusValidation");

/**
 * @swagger
 * tags:
 *   name: LidStatus
 *   description: Lid statuslarini boshqarish API endpointlari
 */

/**
 * @swagger
 * /lid-status/create:
 *   post:
 *     summary: Yangi lid statusi yaratish
 *     tags: [LidStatus]
 *     description: Yangi lid statusini yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: Status nomi
 *     responses:
 *       "201":
 *         description: Status muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday status mavjud
 *       "500":
 *         description: Ichki server xatosi
 */
lidStatus.post("/create", validateSchema(createLidStatusValidationSchema), createLidStatus);

/**
 * @swagger
 * /lid-status/getAll:
 *   get:
 *     summary: Barcha lid statuslarini olish
 *     tags: [LidStatus]
 *     description: Barcha mavjud lid statuslari ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: Statuslar ro'yxati olindi
 *       "500":
 *         description: Ichki server xatosi
 */
lidStatus.get("/getAll", getAllLidStatuses);

/**
 * @swagger
 * /lid-status/getById/{id}:
 *   get:
 *     summary: ID orqali bitta statusni olish
 *     tags: [LidStatus]
 *     description: Berilgan ID ga ega statusni qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Statusning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Status topildi
 *       "404":
 *         description: Status topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lidStatus.get("/getById/:id", getLidStatusById);

/**
 * @swagger
 * /lid-status/update/{id}:
 *   put:
 *     summary: Status ma'lumotlarini yangilash
 *     tags: [LidStatus]
 *     description: ID orqali status nomini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan statusning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Statusning yangi nomi
 *     responses:
 *       "200":
 *         description: Status muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki bu nomdagi status mavjud
 *       "404":
 *         description: Status topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lidStatus.put("/update/:id", validateSchema(updateLidStatusValidationSchema), updateLidStatus);

/**
 * @swagger
 * /lid-status/delete/{id}:
 *   delete:
 *     summary: Statusni o'chirish
 *     tags: [LidStatus]
 *     description: ID orqali statusni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan statusning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Status muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Status topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
lidStatus.delete("/delete/:id", deleteLidStatus);

/**
 * @swagger
 * /lid-status/search:
 *   get:
 *     summary: Status nomi bo'yicha qidirish
 *     tags: [LidStatus]
 *     description: Status nomiga qarab qidirish
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
lidStatus.get("/search", searchLidStatus);

module.exports = { lidStatus };
