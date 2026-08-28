const { Router } = require("express");
const stage = Router();

const {
    createStage,
    getAllStages,
    getStageById,
    updateStage,
    deleteStage,
    searchStage,
} = require("../controllers/stage.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createStageValidationSchema,
    updateStageValidationSchema,
} = require("../validation/stageValidation");

/**
 * @swagger
 * tags:
 *   name: Stage
 *   description: Bosqichlarni (Stage) boshqarish API endpointlari
 */

/**
 * @swagger
 * /stage/create:
 *   post:
 *     summary: Yangi bosqich yaratish
 *     tags: [Stage]
 *     description: Yangi bosqich nomini kiritib yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Bosqich nomi
 *     responses:
 *       "201":
 *         description: Bosqich muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday bosqich mavjud
 *       "500":
 *         description: Ichki server xatosi
 */
stage.post("/create", validateSchema(createStageValidationSchema), createStage);

/**
 * @swagger
 * /stage/getAll:
 *   get:
 *     summary: Barcha bosqichlar ro'yxatini olish
 *     tags: [Stage]
 *     description: Barcha mavjud bosqichlar ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: Bosqichlar ro'yxati olindi
 *       "500":
 *         description: Ichki server xatosi
 */
stage.get("/getAll", getAllStages);

/**
 * @swagger
 * /stage/getById/{id}:
 *   get:
 *     summary: ID orqali bitta bosqichni olish
 *     tags: [Stage]
 *     description: Berilgan ID ga ega bosqichni qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Bosqichning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Bosqich topildi
 *       "404":
 *         description: Bosqich topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stage.get("/getById/:id", getStageById);

/**
 * @swagger
 * /stage/update/{id}:
 *   put:
 *     summary: Bosqich ma'lumotlarini yangilash
 *     tags: [Stage]
 *     description: ID orqali bosqich nomini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan bosqichning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Bosqichning yangi nomi
 *     responses:
 *       "200":
 *         description: Bosqich muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki bu nomdagi bosqich mavjud
 *       "404":
 *         description: Bosqich topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stage.put("/update/:id", validateSchema(updateStageValidationSchema), updateStage);

/**
 * @swagger
 * /stage/delete/{id}:
 *   delete:
 *     summary: Bosqichni o'chirish
 *     tags: [Stage]
 *     description: ID orqali bosqichni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan bosqichning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Bosqich muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Bosqich topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stage.delete("/delete/:id", deleteStage);

/**
 * @swagger
 * /stage/search:
 *   get:
 *     summary: Bosqich nomi bo'yicha qidirish
 *     tags: [Stage]
 *     description: Bosqich nomiga qarab qidirish
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
stage.get("/search", searchStage);

module.exports = { stage };
