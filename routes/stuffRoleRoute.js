const { Router } = require("express");
const stuffRole = Router();

const {
    createStuffRole,
    getAllStuffRole,
    getStuffRoleById,
    updateStuffRole,
    deleteStuffRole,
} = require("../controllers/stuffRole.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createStuffRoleValidationSchema,
    updateStuffRoleValidationSchema,
} = require("../validation/stuffRoleValidation");

/**
 * @swagger
 * tags:
 *   name: StuffRole
 *   description: Xodim va rollar o'rtasidagi bog'lanishlarni boshqarish API endpointlari
 */


/**
 * @swagger
 * /stuff-role/create:
 *   post:
 *     summary: Xodimga rol berish
 *     tags: [StuffRole]
 *     description: Xodim va rol o'rtasida yangi bog'lanish yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stuff_id
 *               - role_id
 *             properties:
 *               stuff_id:
 *                 type: string
 *                 description: Xodimning ID si (MongoDB ObjectId)
 *               role_id:
 *                 type: string
 *                 description: Rolning ID si (MongoDB ObjectId)
 *     responses:
 *       "201":
 *         description: Xodimga rol muvaffaqiyatli berildi
 *       "400":
 *         description: Validatsiya xatosi yoki bu xodim allaqachon ushbu rolga biriktirilgan
 *       "404":
 *         description: Xodim yoki rol topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.post("/create", validateSchema(createStuffRoleValidationSchema), createStuffRole);

/**
 * @swagger
 * /stuff-role/getAll:
 *   get:
 *     summary: Barcha xodim-rol bog'lanishlarini olish
 *     tags: [StuffRole]
 *     description: Barcha biriktirilgan xodim va rollarning to'liq ro'yxati
 *     responses:
 *       "200":
 *         description: Ma'lumotlar muvaffaqiyatli olindi
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.get("/getAll", getAllStuffRole);

/**
 * @swagger
 * /stuff-role/getById/{id}:
 *   get:
 *     summary: ID orqali bitta bog'lanishni olish
 *     tags: [StuffRole]
 *     description: ID orqali xodim-rol bog'lanishini olish
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
stuffRole.get("/getById/:id", getStuffRoleById);

/**
 * @swagger
 * /stuff-role/update/{id}:
 *   put:
 *     summary: Bog'lanish ma'lumotini yangilash
 *     tags: [StuffRole]
 *     description: Xodim va rol o'rtasidagi bog'lanish ma'lumotini yangilash
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
 *             required:
 *               - stuff_id
 *               - role_id
 *             properties:
 *               stuff_id:
 *                 type: string
 *                 description: Xodimning ID si (MongoDB ObjectId)
 *               role_id:
 *                 type: string
 *                 description: Rolning ID si (MongoDB ObjectId)
 *     responses:
 *       "200":
 *         description: Bog'lanish ma'lumoti muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki bu xodim allaqachon ushbu rolga biriktirilgan
 *       "404":
 *         description: Yangilanadigan ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.put("/update/:id", validateSchema(updateStuffRoleValidationSchema), updateStuffRole);

/**
 * @swagger
 * /stuff-role/delete/{id}:
 *   delete:
 *     summary: Xodimga berilgan rol o'chirish
 *     tags: [StuffRole]
 *     description: ID orqali xodim va rol o'rtasidagi bog'lanishni o'chiradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan yozuvning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Bog'lanish ma'lumoti muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Bog'lanish ma'lumoti topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.delete("/delete/:id", deleteStuffRole);

module.exports = { stuffRole };