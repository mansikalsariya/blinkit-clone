import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

const generatedAccessToken = async (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing!"); 
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "5h" });
};

export default generatedAccessToken;
