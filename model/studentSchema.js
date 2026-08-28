const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
    {
        lid_id: {
            type: Schema.Types.ObjectId,
            ref: "Lid",
        },
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
        },
        phone_number: {
            type: String,
            required: true,
            trim: true,
        },
        bithday: {
            type: Date,
        },
        gender: {
            type: String,
            trim: true,
        },
    }
);

const Student = model("Student", studentSchema);

module.exports = { Student };
