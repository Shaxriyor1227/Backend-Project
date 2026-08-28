const { StudentGroup } = require("../model/studentGroupSchema");

// ----------------Create StudentGroup------------------------
const createStudentGroup = async (req, res) => {
    try {
        const { student_id, group_id } = req.body;

        const existingRelation = await StudentGroup.findOne({ student_id, group_id });
        if (existingRelation) {
            return res.status(400).json({
                success: false,
                message: "Ushbu o'quvchi allaqachon mazkur guruhga biriktirilgan.",
            });
        }

        const newStudentGroup = new StudentGroup({
            student_id,
            group_id,
        });

        await newStudentGroup.save();

        return res.status(201).json({
            success: true,
            message: "O'quvchi guruhga muvaffaqiyatli biriktirildi.",
            innerData: newStudentGroup,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: O'quvchini guruhga biriktirishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get StudentGroups------------------------
const getAllStudentGroups = async (req, res) => {
    try {
        const list = await StudentGroup.find({})
            .populate("student_id")
            .populate("group_id");

        res.json({
            success: true,
            message: "Barcha o'quvchi-guruh bog'lanishlari ro'yxati olingan.",
            innerData: list,
        });
    } catch (error) {
        console.error("Error fetching student_groups:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get StudentGroup By ID------------------------
const getStudentGroupById = async (req, res) => {
    try {
        const studentGroupId = req.params.id;
        const item = await StudentGroup.findById(studentGroupId)
            .populate("student_id")
            .populate("group_id");

        if (!item) {
            return res.status(404).json({ message: "StudentGroup not found" });
        }

        return res.status(200).json({ message: "StudentGroup found", innerData: item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update StudentGroup Teacher------------------------
const updateStudentGroup = async (req, res) => {
    try {
        const studentGroupId = req.params.id;

        const updatedItem = await StudentGroup.findByIdAndUpdate(
            studentGroupId,
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

// ----------------Delete StudentGroup------------------------
const deleteStudentGroup = async (req, res) => {
    try {
        const studentGroupId = req.params.id;
        const deletedItem = await StudentGroup.findByIdAndDelete(studentGroupId);

        if (!deletedItem) {
            return res.status(404).json({ message: "StudentGroup not found" });
        }

        res.json({ message: "StudentGroup deleted successfully", innerData: deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createStudentGroup,
    getAllStudentGroups,
    getStudentGroupById,
    updateStudentGroup,
    deleteStudentGroup,
};
