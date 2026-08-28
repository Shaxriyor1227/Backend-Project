const { StuffRole } = require("../model/stuffRole");
const { Stuff } = require("../model/StuffSchema");
const { Role } = require("../model/roleSchema");

// ----------------Create StuffRole------------------------
const createStuffRole = async (req, res) => {
    try {
        const { stuff_id, role_id } = req.body;

        const existingStuff = await Stuff.findById(stuff_id);
        if (!existingStuff) {
            return res.status(404).json({
                success: false,
                message: "Bunday xodim topilmadi.",
            });
        }

        const existingRole = await Role.findById(role_id);
        if (!existingRole) {
            return res.status(404).json({
                success: false,
                message: "Bunday rol topilmadi.",
            });
        }

        const existingStuffRole = await StuffRole.findOne({ stuff_id, role_id });
        if (existingStuffRole) {
            return res.status(400).json({
                success: false,
                message: "Ushbu xodim allaqachon mazkur rolga biriktirilgan.",
            });
        }

        const newStuffRole = new StuffRole({ stuff_id, role_id });
        await newStuffRole.save();

        return res.status(201).json({
            success: true,
            message: "Xodim rolga muvaffaqiyatli biriktirildi.",
            innerData: newStuffRole,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Rolga xodim biriktirishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get StuffRoles------------------------
const getAllStuffRole = async (req, res) => {
    try {
        const list = await StuffRole.find({}).populate("stuff_id").populate("role_id");
        res.json({
            success: true,
            message: "Barcha xodim-rol bog'lanishlari ro'yxati olingan.",
            innerData: list,
        });
    } catch (error) {
        console.error("Error fetching stuff_roles:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get StuffRole By ID------------------------
const getStuffRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await StuffRole.findById(id).populate("stuff_id").populate("role_id");

        if (!item) {
            return res.status(404).json({ message: "StuffRole not found" });
        }

        return res.status(200).json({ message: "StuffRole found", innerData: item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update StuffRole Teacher------------------------
const updateStuffRole = async (req, res) => {
    try {
        const id = req.params.id;

        const updatedItem = await StuffRole.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Bog'lanish ma'lumoti topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bog'lanish ma'lumotlari yangilandi",
            innerData: updatedItem,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete StuffRole------------------------
const deleteStuffRole = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await StuffRole.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({ message: "StuffRole not found" });
        }

        res.json({ message: "StuffRole deleted successfully", innerData: item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createStuffRole,
    getAllStuffRole,
    getStuffRoleById,
    updateStuffRole,
    deleteStuffRole,
};
