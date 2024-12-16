import express from "express";
const router=express.Router();
import signup from "../controller/signup.controller.js";

router.get("/", (req, res) => {
    res.render("index", {
      title: "Welcome to My Website",
      description: "This is a basic EJS template example.",
    });
  });
  
  
  router.post("/signup", signup);
  
  router.post("/login", async (req, res) => {
    try {
      const { userId, password } = req.body;
      if (!userId || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      const user = await userData.findOne({ userId });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      res.status(200).json({ message: "Login successful." });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
  
  router.put("/update", async (req, res) => {
    try {
      const { id, userId, fa, ta } = req.body;
  
      // Validate required fields
      if (!id || !userId) {
        return res.status(400).json({ message: "User ID and _id are required." });
      }
  
      // Find the user by _id and userId
      const user = await userData.findOne({ _id: id, userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Update `fa` and `ta` arrays only if they are provided
      if (Array.isArray(fa)) user.fa = fa;
      if (Array.isArray(ta)) user.ta = ta;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      console.error("Error during update:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
  
  router.get("/users", async (req, res) => {
    try {
      const users = await userData.find();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  //------------------------------led-------------------//
  router.post("/addLed", async (req, res) => {
    try {
      const { dev_name, metaData } = req.body;
  
      if (!dev_name || !metaData) {
        return res
          .status(400)
          .json({ message: "dev_name and metaData are required." });
      }
  
      // Check if an LED document with the given dev_name exists
      const existingLed = await led.findOne({ dev_name });
  
      if (existingLed) {
        // If LED exists, push the new metaData into the existing metaData array
        existingLed.metaData.push(...metaData); // Spread to push multiple entries if provided
        await existingLed.save();
        return res
          .status(200)
          .json({ message: "MetaData added to existing LED." });
      }
  
      // If no LED exists, create a new one
      await led.create({ dev_name, metaData });
      res.status(201).json({ message: "New LED created successfully." });
    } catch (error) {
      console.error("Error adding LED:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
  router.get("/getLeds", async (req, res) => {
    try {
      const leds = await led.find();
      res.json(leds);
    } catch (error) {
      console.error("Error fetching LEDs:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.put("/updateLed", async (req, res) => {
    try {
      const { dev_name, metaDataId, status } = req.body;
  
      // Validate required fields
      if (!dev_name || !metaDataId || status === undefined) {
        return res
          .status(400)
          .json({ message: "dev_name, metaDataId, and status are required." });
      }
  
      // Find the LED by dev_name
      const ledToUpdate = await led.findOne({ dev_name });
  
      if (!ledToUpdate) {
        return res.status(404).json({ message: "LED not found." });
      }
  
      // Find the specific metaData by id in the metaData array
      const metaDataItem = ledToUpdate.metaData.find(
        (item) => item.id.toString() === metaDataId
      );
  
      if (!metaDataItem) {
        return res.status(404).json({ message: "MetaData not found." });
      }
  
      // Update the status of the found metaData item
      metaDataItem.status = status;
  
      // Save the updated LED document
      await ledToUpdate.save();
  
      res.status(200).json({ message: "MetaData status updated successfully." });
    } catch (error) {
      console.error("Error during update:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
  router.delete("/deleteLed", async (req, res) => {
    try {
      const { dev_name, metaDataId } = req.query;
  
      // Validate required fields
      if (!dev_name || !metaDataId) {
        return res
          .status(400)
          .json({ message: "dev_name and metaDataId are required." });
      }
  
      // Find the LED by dev_name
      const ledToUpdate = await led.findOne({ dev_name });
  
      if (!ledToUpdate) {
        return res.status(404).json({ message: "LED not found." });
      }
  
      // Filter out the specific metadata item by metaDataId
      const updatedMetaData = ledToUpdate.metaData.filter(
        (item) => item.id.toString() !== metaDataId
      );
  
      // If no changes were made (i.e., metadata not found), return an error
      if (updatedMetaData.length === ledToUpdate.metaData.length) {
        return res.status(404).json({ message: "MetaData not found." });
      }
  
      // Update the metaData array and save the document
      ledToUpdate.metaData = updatedMetaData;
      await ledToUpdate.save();
  
      res.status(200).json({ message: "MetaData deleted successfully." });
    } catch (error) {
      console.error("Error during delete:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
export default router;
