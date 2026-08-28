const { Lesson } = require("../model/lessonSchema");

// ----------------Create Lesson------------------------
const createLesson = async (req, res) => {
    try {
        const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

        const newLesson = new Lesson({
            lesson_theme,
            lesson_number,
            group_id,
            lesson_date,
        });

        await newLesson.save();

        return res.status(201).json({
            success: true,
            message: "Dars muvaffaqiyatli yaratildi.",
            innerData: newLesson,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: Dars yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Lessons------------------------
const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({}).populate("group_id");
        res.json({
            success: true,
            message: "Barcha darslar ro'yxati olingan.",
            innerData: lessons,
        });
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Darslarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Lesson By ID------------------------
const getLessonById = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const lesson = await Lesson.findById(lessonId).populate("group_id");

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        return res.status(200).json({ message: "Lesson found", innerData: lesson });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Lesson Teacher------------------------
const updateLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;

        const updatedLesson = await Lesson.findByIdAndUpdate(
            lessonId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({
                success: false,
                message: "Dars topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Dars ma'lumotlari yangilandi",
            innerData: updatedLesson,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Lesson------------------------
const deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

        if (!deletedLesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        res.json({ message: "Lesson deleted successfully", innerData: deletedLesson });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Lesson-------------------
const searchLesson = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Lesson.find({
            $or: [
                { lesson_theme: { $regex: query, $options: "i" } },
            ],
        }).populate("group_id");

        if (result.length === 0) {
            return res.json({ message: "Bunday dars topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ message: "Server error: Failed to fetch lessons." });
    }
};

module.exports = {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
    searchLesson,
};
