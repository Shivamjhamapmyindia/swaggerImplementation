import Model from '../model/model.js';
import path from 'path';
import fs from 'fs';

// Upload model and additional file
exports.uploadModel = async (req, res) => {
    try {
        const modelFile = req.files['model'][0];  // GLB model file
        const otherFile = req.files['otherFile'][0];  // Additional file
        
        // Check if model already exists in the database
        const existingModel = await Model.findOne({ originalName: modelFile.originalname });
        if (existingModel) {
            return res.status(400).send('Model already exists!');
        }
        
        // Save new model data
        const newModel = new Model({
            originalName: modelFile.originalname,
            modelName: modelFile.filename,  // Unique filename with timestamp
            filePath: modelFile.path,
            uploadDate: new Date(),
        });

        await newModel.save();  // Save the model details to the database
        
        res.send('Model uploaded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Get model details by model name
exports.getModelDetails = async (req, res) => {
    try {
        const modelName = req.params.modelName;
        
        // Retrieve model details from the database
        const model = await Model.findOne({ modelName: modelName });
        
        if (!model) {
            return res.status(404).send('Model not found');
        }
        
        res.json(model);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Serve the model file (GLB file)
exports.serveModel = async (req, res) => {
    try {
        const modelName = req.params.modelName;
        
        // Retrieve the model from the database
        const model = await Model.findOne({ modelName: modelName });
        
        if (!model) {
            return res.status(404).send('Model not found');
        }
        
        // Serve the GLB model file from the file system
        res.sendFile(path.resolve(model.filePath));
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
