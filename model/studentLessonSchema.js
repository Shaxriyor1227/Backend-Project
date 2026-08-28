const { Schema, model } = require("mongoose");

const studentLessonSchema = new Schema(
    {
        lesson_id: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
        },
        student_id: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        is_there: {
            type: Boolean,
            default: false,
        },
        reason: {
            type: String,
            trim: true,
            default: "",
        },
        be_paid: {
            type: Boolean,
            default: false,
        },
    }
);

// Bitta o'quvchiga bitta dars uchun faqat bitta davomat yozuvi bo'lishi uchun (Unique index)
studentLessonSchema.index({ lesson_id: 1, student_id: 1 }, { unique: true });

const StudentLesson = model("StudentLesson", studentLessonSchema);

module.exports = { StudentLesson };
