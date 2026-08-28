const { Router } = require("express");
const branch = Router();

const {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    searchBranch,
} = require("../controllers/branch.controller");


const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    createBranchValidationSchema,
    updateBranchValidationSchema,
} = require("../validation/branchValidation");

/**
 * @swagger
 * tags:
 *   name: Branch
 *   description: Filiallarni boshqarish API endpointlari
 */

/**
 * @swagger
 * /branch/create:
 *   post:
 *     summary: Yangi filial yaratish
 *     tags: [Branch]
 *     description: Yangi o'quv markazi filialini yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - call_number
 *             properties:
 *               name:
 *                 type: string
 *                 description: Filial nomi
 *               address:
 *                 type: string
 *                 description: Filial manzili
 *               call_number:
 *                 type: string
 *                 description: Filial telefon raqami
 *     responses:
 *       "201":
 *         description: Filial muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday filial mavjud
 *       "500":
 *         description: Ichki server xatosi
 */
branch.post("/create", validateSchema(createBranchValidationSchema), createBranch);

/**
 * @swagger
 * /branch/getAll:
 *   get:
 *     summary: Barcha filiallar ro'yxatini olish
 *     tags: [Branch]
 *     description: Barcha mavjud filiallar ro'yxatini qaytaradi
 *     responses:
 *       "200":
 *         description: Filiallar ro'yxati olindi
 *       "500":
 *         description: Ichki server xatosi
 */
branch.get("/getAll", getAllBranches);

/**
 * @swagger
 * /branch/getById/{id}:
 *   get:
 *     summary: ID orqali bitta filialni olish
 *     tags: [Branch]
 *     description: Berilgan ID ga mos keluvchi filialni qaytaradi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Filialning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Filial ma'lumoti topildi
 *       "404":
 *         description: Filial topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
branch.get("/getById/:id", getBranchById);

/**
 * @swagger
 * /branch/update/{id}:
 *   put:
 *     summary: Filial ma'lumotlarini yangilash
 *     tags: [Branch]
 *     description: ID orqali berilgan filial ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan filialning ID si
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
 *                 description: Yangi filial nomi
 *               address:
 *                 type: string
 *                 description: Yangi manzil
 *               call_number:
 *                 type: string
 *                 description: Yangi telefon raqami
 *     responses:
 *       "200":
 *         description: Filial muvaffaqiyatli yangilandi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday nomdagi filial mavjud
 *       "404":
 *         description: Filial topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
branch.put("/update/:id", validateSchema(updateBranchValidationSchema), updateBranch);

/**
 * @swagger
 * /branch/delete/{id}:
 *   delete:
 *     summary: Filialni o'chirish
 *     tags: [Branch]
 *     description: ID orqali filialni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan filialning ID si
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Filial muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Filial topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
branch.delete("/delete/:id", deleteBranch);

/**
 * @swagger
 * /branch/search:
 *   get:
 *     summary: Filiallarni qidirish
 *     tags: [Branch]
 *     description: Filial nomi, manzili yoki telefon raqami bo'yicha qidirish
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
branch.get("/search", searchBranch);

module.exports = { branch };
