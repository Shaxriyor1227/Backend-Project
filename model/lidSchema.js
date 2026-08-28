const { Schema, model } = require("mongoose");

const lidSchema = new Schema(
    {
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
        lid_stage_id: {
            type: Schema.Types.ObjectId,
            ref: "Stage",
        },
        test_date: {
            type: Date,
        },
        trial_lesson_date: {
            type: Date,
        },
        trial_lesson_time: {
            type: String,
            trim: true,
        },
        trial_lesson_group_id: {
            type: Schema.Types.ObjectId,
            ref: "Group",
        },
        lid_status_id: {
            type: Schema.Types.ObjectId,
            ref: "LidStatus",
        },
        cancel_reson_id: {
            type: Schema.Types.ObjectId,
            ref: "ReasonLid",
        },
    }
);

const Lid = model("Lid", lidSchema);

module.exports = { Lid };
