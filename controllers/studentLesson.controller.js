const { StudentLesson } = require("../model/studentLessonSchema");

// ----------------Create StudentLesson------------------------
const createStudentLesson = async (req, res) => {
    try {
        const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

        const existingRecord = await StudentLesson.findOne({ lesson_id, student_id });
        if (existingRecord) {
            return res.status(400).json({
                success: false,
                message: "Ushbu dars uchun mazkur o'quvchining davomat yozuvi allaqachon mavjud.",
            });
        }

        const newStudentLesson = new StudentLesson({
            lesson_id,
            student_id,
            is_there: is_there !== undefined ? is_there : false,
            reason: reason || "",
            be_paid: be_paid !== undefined ? be_paid : false,
        });

        await newStudentLesson.save();

        return res.status(201).json({
            success: true,
            message: "O'quvchi dars davomati muvaffaqiyatli saqlandi.",
            innerData: newStudentLesson,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Davomatni saqlashda xatolik yuz berdi.",
        });
    }
};

// ----------------Get StudentLessons------------------------
const getAllStudentLessons = async (req, res) => {
    try {
        const list = await StudentLesson.find({})
            .populate("lesson_id")
            .populate("student_id");

        res.json({
            success: true,
            message: "Barcha davomat yozuvlari ro'yxati olingan.",
            innerData: list,
        });
    } catch (error) {
        console.error("Error fetching student_lessons:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get StudentLesson By ID------------------------
const getStudentLessonById = async (req, res) => {
    try {
        const studentLessonId = req.params.id;
        const item = await StudentLesson.findById(studentLessonId)
            .populate("lesson_id")
            .populate("student_id");

        if (!item) {
            return res.status(404).json({ message: "StudentLesson not found" });
        }

        return res.status(200).json({ message: "StudentLesson found", innerData: item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update StudentLesson Teacher------------------------
const updateStudentLesson = async (req, res) => {
    try {
        const studentLessonId = req.params.id;

        const updatedItem = await StudentLesson.findByIdAndUpdate(
            studentLessonId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Davomat yozuvi topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Davomat ma'lumotlari yangilandi",
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

// ----------------Delete StudentLesson------------------------
const deleteStudentLesson = async (req, res) => {
    try {
        const studentLessonId = req.params.id;
        const deletedItem = await StudentLesson.findByIdAndDelete(studentLessonId);

        if (!deletedItem) {
            return res.status(404).json({ message: "StudentLesson not found" });
        }

        res.json({ message: "StudentLesson deleted successfully", innerData: deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createStudentLesson,
    getAllStudentLessons,
    getStudentLessonById,
    updateStudentLesson,
    deleteStudentLesson,
};
