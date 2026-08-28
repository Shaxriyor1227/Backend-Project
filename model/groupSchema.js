const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
    {
        group_name: {
            type: String,
            required: true,
            trim: true,
        },
        lesson_start_time: {
            type: String,
            required: true,
            trim: true,
        },
        lesson_continuous: {
            type: String,
            required: true,
            trim: true,
        },
        lesson_week_day: {
            type: String,
            required: true,
            trim: true,
        },
        group_stage_id: {
            type: Schema.Types.ObjectId,
            ref: "Stage",
        },
        room_number: {
            type: String,
            required: true,
            trim: true,
        },
        room_floor: {
            type: Number,
            required: true,
        },
        branch_id: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
        },
        lessons_quant: {
            type: Number,
            required: true,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    }
);

const Group = model("Group", groupSchema);

module.exports = { Group };
