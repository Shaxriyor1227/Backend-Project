const { Router } = require("express");
const groupStuff = Router();

const {
    createGroupStuff,
    getAllGroupStuff,
    getGroupStuffById,
    updateGroupStuff,
    deleteGroupStuff,
} = require("../controllers/groupStuff.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createGroupStuffValidationSchema,
    updateGroupStuffValidationSchema,
} = require("../validation/groupStuffValidation");

/**
 * @swagger
 * tags:
 *   - name: GroupStuff
 *     description: Guruh va xodimlar o'rtasidagi bog'lanishlarni boshqarish API endpointlari
 */

/**
 * @swagger
 * /group-stuff/create:
 *   post:
 *     summary: Guruhga xodim biriktirish
 *     tags: [GroupStuff]
 *     description: Guruh va xodim o'rtasida yangi bog'lanish yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - group_id
 *               - stuff_id
 *             properties:
 *               group_id:
 *                 type: string
 *                 description: Guruhning ID si (MongoDB ObjectId)
 *               stuff_id:
 *                 type: string
 *                 description: Xodimning ID si (MongoDB ObjectId)
 *     responses:
 *       "201":
 *         description: Xodim guruhga muvaffaqiyatli biriktirildi
 *       "400":
 *         description: Validatsiya xatosi yoki bu xodim allaqachon guruhga biriktirilgan
 *       "404":
 *         description: Xodim topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
groupStuff.post("/create", validateSchema(createGroupStuffValidationSchema), createGroupStuff);

/**
 * @swagger
 * /group-stuff/getAll:
 *   get:
 *     summary: Barcha guruh-xodim bog'lanishlarini olish
 *     tags: [GroupStuff]
 *     description: Barcha biriktirilgan guruh va xodimlarning to'liq ro'yxati
 *     responses:
 *       "200":
 *         description: Ma'lumotlar muvaffaqiyatli olindi
 *       "500":
 *         description: Ichki server xatosi
 */
groupStuff.get("/getAll", getAllGroupStuff);

/**
 * @swagger
 * /group-stuff/getById/{id}:
 *   get:
 *     summary: ID orqali bitta bog'lanishni olish
 *     tags: [GroupStuff]
 *     description: ID orqali guruh-xodim bog'lanishini olish
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
groupStuff.get("/getById/:id", getGroupStuffById);

/**
 * @swagger
 * /group-stuff/update/{id}:
 *   put:
 *     summary: Guruh-xodim bog'lanishini yangilash
 *     tags: [GroupStuff]
 *     description: ID orqali guruh yoki xodim ID larini o'zgartirish
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
 *               group_id:
 *                 type: string
 *                 description: Yangi guruh ID si
 *               stuff_id:
 *                 type: string
 *                 description: Yangi xodim ID si
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
groupStuff.put("/update/:id", validateSchema(updateGroupStuffValidationSchema), updateGroupStuff);

/**
 * @swagger
 * /group-stuff/delete/{id}:
 *   delete:
 *     summary: Xodimni guruhdan ajratish / o'chirish
 *     tags: [GroupStuff]
 *     description: ID orqali guruh-xodim bog'lanishini o'chiradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan bog'lanish ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Xodim guruhdan muvaffaqiyatli ajratildi
 *       "404":
 *         description: Ma'lumot topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
groupStuff.delete("/delete/:id", deleteGroupStuff);

module.exports = { groupStuff };
