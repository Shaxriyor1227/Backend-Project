const { Schema, model } = require("mongoose");

const groupStuffSchema = new Schema(
    {
        group_id: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        stuff_id: {
            type: Schema.Types.ObjectId,
            ref: "Stuff",
            required: true,
        },
    }
);

// Bitta xodim bitta guruhga 2 marta biriktirilib qolmasligi uchun (Unique index)
groupStuffSchema.index({ group_id: 1, stuff_id: 1 }, { unique: true });

const GroupStuff = model("GroupStuff", groupStuffSchema);

module.exports = { GroupStuff };
