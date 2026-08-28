const { Role } = require("../model/roleSchema");

// ----------------Create Role------------------------
const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan o'tgan rol mavjud.",
            });
        }

        const newRole = new Role({
            name,
        });

        await newRole.save();

        return res.status(201).json({
            success: true,
            message: "Rol muvaffaqiyatli yaratildi.",
            innerData: newRole,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Rol yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Roles------------------------
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({});
        res.json({
            success: true,
            message: "Barcha rollar ro'yxati olingan.",
            innerData: roles,
        });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Rollarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Role By ID------------------------
const getRoleById = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById(roleId);

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        return res.status(200).json({ message: "Role found", innerData: role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Role Teacher------------------------
const updateRole = async (req, res) => {
    try {
        const roleId = req.params.id;

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            return res.status(404).json({
                success: false,
                message: "Rol topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rol ma'lumotlari yangilandi",
            innerData: updatedRole,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Role------------------------
const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const deletedRole = await Role.findByIdAndDelete(roleId);

        if (!deletedRole) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.json({ message: "Role deleted successfully", innerData: deletedRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Role-------------------
const searchRole = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Role.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
            ],
        });

        if (result.length === 0) {
            return res.json({ message: "Bunday rol topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Server error: Failed to fetch roles." });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    searchRole,
};
