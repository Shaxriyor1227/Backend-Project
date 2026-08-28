const { Router } = require("express");
const reasonLid = Router();

const {
    createReasonLid,
    getAllReasonLids,
    getReasonLidById,
    updateReasonLid,
    deleteReasonLid,
    searchReasonLid,
} = require("../controllers/reasonLid.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createReasonLidValidationSchema,
    updateReasonLidValidationSchema,
} = require("../validation/reasonLidValidation");

/**
 * @swagger
 * tags:
 *   name: ReasonLid
 *   description: Lid bekor qilish sabablari API endpointlari
 */

/**
 * @swagger
 * /reason-lid/create:
 *   post:
 *     summary: Yangi sabab yaratish
 *     tags: [ReasonLid]
 *     description: Lidni bekor qilish sababini yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason_lid
 *             properties:
 *               reason_lid:
 *                 type: string
 *                 description: Sabab matni
 *     responses:
 *       "201":
 *         description: Sabab muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
reasonLid.post("/create", validateSchema(createReasonLidValidationSchema), createReasonLid);

/**
 * @swagger
 * /reason-lid/getAll:
 *   get:
 *     summary: Barcha sabablarni olish
 *     tags: [ReasonLid]
 *     description: Barcha mavjud sabablar ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: Sabablar ro'yxati olindi
 *       "500":
 *         description: Ichki server xatosi
 */
reasonLid.get("/getAll", getAllReasonLids);

/**
 * @swagger
 * /reason-lid/getById/{id}:
 *   get:
 *     summary: ID orqali bitta sababni olish
 *     tags: [ReasonLid]
 *     description: Berilgan ID ga ega sababni qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sababning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Sabab topildi
 *       "404":
 *         description: Sabab topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
reasonLid.get("/getById/:id", getReasonLidById);

/**
 * @swagger
 * /reason-lid/update/{id}:
 *   put:
 *     summary: Sabab ma'lumotlarini yangilash
 *     tags: [ReasonLid]
 *     description: ID orqali sabab matnini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan sababning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason_lid:
 *                 type: string
 *                 description: Yangi sabab matni
 *     responses:
 *       "200":
 *         description: Sabab muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi
 *       "404":
 *         description: Sabab topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
reasonLid.put("/update/:id", validateSchema(updateReasonLidValidationSchema), updateReasonLid);

/**
 * @swagger
 * /reason-lid/delete/{id}:
 *   delete:
 *     summary: Sababni o'chirish
 *     tags: [ReasonLid]
 *     description: ID orqali sababni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan sababning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Sabab muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Sabab topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
reasonLid.delete("/delete/:id", deleteReasonLid);

/**
 * @swagger
 * /reason-lid/search:
 *   get:
 *     summary: Sabab bo'yicha qidirish
 *     tags: [ReasonLid]
 *     description: Sabab matniga qarab qidirish
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
reasonLid.get("/search", searchReasonLid);

module.exports = { reasonLid };
