const { Router } = require("express");
const role = Router();

const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    searchRole,
} = require("../controllers/role.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createRoleValidationSchema,
    updateRoleValidationSchema,
} = require("../validation/roleValidation");

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Rollarni boshqarish API endpointlari
 */

/**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Yangi rol yaratish
 *     tags: [Role]
 *     description: Yangi rolni nom bilan yaratish
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
 *                 description: Rolning nomi
 *     responses:
 *       "201":
 *         description: Rol muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday rol allaqachon mavjud
 *       "500":
 *         description: Ichki server xatosi
 */
role.post("/create", validateSchema(createRoleValidationSchema), createRole);

/**
 * @swagger
 * /role/getAll:
 *   get:
 *     summary: Barcha rollar ro'yxatini olish
 *     tags: [Role]
 *     description: Barcha mavjud rollarni olish
 *     responses:
 *       "200":
 *         description: Rollar muvaffaqiyatli olindi
 *       "500":
 *         description: Ichki server xatosi
 */
role.get("/getAll", getAllRoles);

/**
 * @swagger
 * /role/getById/{id}:
 *   get:
 *     summary: ID orqali bitta rolni olish
 *     tags: [Role]
 *     description: Berilgan ID ga ega rolni qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rolning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Rol topildi
 *       "404":
 *         description: Rol topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
role.get("/getById/:id", getRoleById);

/**
 * @swagger
 * /role/update/{id}:
 *   put:
 *     summary: Rol ma'lumotlarini yangilash
 *     tags: [Role]
 *     description: ID orqali rol nomini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan rolning ID si
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
 *                 description: Rolning yangi nomi
 *     responses:
 *       "200":
 *         description: Rol muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki bu nomdagi rol mavjud
 *       "404":
 *         description: Rol topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
role.put("/update/:id", validateSchema(updateRoleValidationSchema), updateRole);

/**
 * @swagger
 * /role/delete/{id}:
 *   delete:
 *     summary: Rolni o'chirish
 *     tags: [Role]
 *     description: ID orqali rolni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan rolning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Rol muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Rol topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
role.delete("/delete/:id", deleteRole);

/**
 * @swagger
 * /role/search:
 *   get:
 *     summary: Rol nomi bo'yicha qidirish
 *     tags: [Role]
 *     description: Rol nomiga qarab qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Qidiruv so'zi
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
role.get("/search", searchRole);

module.exports = { role };
