const { Schema, model } = require("mongoose");

const studentGroupSchema = new Schema(
    {
        student_id: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        group_id: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
    }
);

// Bitta o'quvchi bitta guruhga 2 marta biriktirilib qolmasligi uchun (Unique index)
studentGroupSchema.index({ student_id: 1, group_id: 1 }, { unique: true });

const StudentGroup = model("StudentGroup", studentGroupSchema);

module.exports = { StudentGroup };
