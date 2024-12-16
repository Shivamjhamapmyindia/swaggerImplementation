import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// Sub-schema for ta/fa arrays
const activitySchema = new Schema({
    id: {
        type: Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        type: Number,
        required: false,
        min: 0, // Assuming status is non-negative
    },
}, { _id: false }); // Prevents Mongoose from adding automatic _id field for sub-documents

// Main user data schema
const userDataSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true, // Removes extra whitespace
        unique: true, // Ensure unique user IDs
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Enforce stronger passwords
    },
    dev_name: {
        type: String,
        required: true,
        trim: true,
    },
    ta: [activitySchema], // Reuse activity schema for TA and FA
    fa: [activitySchema],
}, { 
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    versionKey: false, // Removes the __v field for cleaner documents
});

// Exporting the model
export default model('UserData', userDataSchema);
