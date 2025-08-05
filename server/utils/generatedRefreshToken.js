import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

const generatedRefreshToken = async (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing!"); 
    }

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    await UserModel.updateOne({ _id: userId }, { refresh_token: token });

    return token;
};

export default generatedRefreshToken;
