const { Student } = require("../model/studentSchema");

// ----------------Create Student------------------------
const createStudent = async (req, res) => {
    try {
        const {
            lid_id,
            first_name,
            last_name,
            phone_number,
            bithday,
            gender,
        } = req.body;

        const newStudent = new Student({
            lid_id: lid_id || undefined,
            first_name,
            last_name,
            phone_number,
            bithday: bithday || undefined,
            gender,
        });

        await newStudent.save();

        return res.status(201).json({
            success: true,
            message: "O'quvchi muvaffaqiyatli yaratildi.",
            innerData: newStudent,
        });
    } catch (error) {
        console.error("Xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Xatosi: O'quvchi yaratishda xatolik yuz berdi.",
        });
    }
};

// ----------------Get Students------------------------
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}).populate("lid_id");
        res.json({
            success: true,
            message: "Barcha o'quvchilar ro'yxati olingan.",
            innerData: students,
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: O'quvchilarni olishda xato yuz berdi.",
        });
    }
};

// ----------------Get Student By ID------------------------
const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId).populate("lid_id");

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student found", innerData: student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ----------------Update Student Teacher------------------------
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "O'quvchi topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "O'quvchi ma'lumotlari yangilandi",
            innerData: updatedStudent,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
        });
    }
};

// ----------------Delete Student------------------------
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully", innerData: deletedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// -------------------search Student-------------------
const searchStudent = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await Student.find({
            $or: [
                { first_name: { $regex: query, $options: "i" } },
                { last_name: { $regex: query, $options: "i" } },
                { phone_number: { $regex: query, $options: "i" } },
            ],
        }).populate("lid_id");

        if (result.length === 0) {
            return res.json({ message: "Bunday o'quvchi topilmadi" });
        }

        res.json({ message: "Search results", innerData: result });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server error: Failed to fetch students." });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudent,
};
