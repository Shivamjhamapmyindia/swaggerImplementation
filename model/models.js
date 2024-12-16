const mongoose = require('mongoose');

// Define a schema for storing model details
const modelSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
    },
    modelName: {
        type: String,
        required: true,
        unique: true,  // Ensure modelName is unique
    },
    filePath: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
module.exports = mongoose.model('Model', modelSchema);
