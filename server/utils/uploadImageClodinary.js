import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

console.log(" Checking Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log(" Checking Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: 'dyq2cxwlt', 
        api_key: '773152163772782', 
        api_secret: 'OwkDYPjwE5HHsM0C9I7nClsVeno' 
});


const uploadImageCloudinary = async (imageBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "binkeyit" },
            (error, result) => {
                if (error) {
                    console.error(" Cloudinary Upload Error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        uploadStream.end(imageBuffer);  
    });
};

export default uploadImageCloudinary;
