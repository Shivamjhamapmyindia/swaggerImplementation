/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registers a new user
 *     description: This endpoint allows a new user to sign up by providing a userId, password, and dev_name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier for the user.
 *                 example: user123
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *                 example: password123
 *               dev_name:
 *                 type: string
 *                 description: The developer's name associated with the user.
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully.
 *       400:
 *         description: All fields are required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required.
 *       409:
 *         description: User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error.
 */
import userData from "../model/userData.js";
async function signup(req, res) {
    try {
      const { userId, password, dev_name } = req.body;
      console.log(userId, password, dev_name);
      if (!userId || !password || !dev_name) {
        return res.status(400).json({ message: "All fields are required." });
      }
      const existingUser = await userData.findOne({ userId });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists." });
      }
      await userData.create({ userId, password, dev_name });
  
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }
  
  export default signup;
  