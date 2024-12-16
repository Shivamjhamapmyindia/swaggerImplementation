import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// Sub-schema for metaData array
const metaDataSchema = new Schema(
  {
    id:{
      type: Types.ObjectId,
      required: true,
      default: () => new Types.ObjectId(),
    },
    name: {
      type: String,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      trim: true,
      lowercase: true, // Ensures consistency
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation
    },
    phoneNumber: {
      type: String, // Changed to String to accommodate formatting (e.g., +123456789)
      validate: {
        validator: (v) => /^\+?[0-9]{7,15}$/.test(v), // Allows optional '+' and 7-15 digits
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    lat: {
      type: Number,
      min: -90,
      max: 90, // Latitude range validation
    },
    lng: {
      type: Number,
      min: -180,
      max: 180, // Longitude range validation
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: Number,
      enum: [0, 1], // Example: 0 = inactive, 1 = active
      default: 0,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
    _id: false, // Prevents automatic generation of `_id` for each sub-document
    versionKey: false, // Disables `__v` field
  }
);

// Main schema for LED
const ledSchema = new Schema(
  {
    dev_name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    metaData: [metaDataSchema], // Array of metaData sub-documents
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` at the root level
    versionKey: false, // Disables `__v` field
  }
);

// Export the model
export default model("LED", ledSchema);
