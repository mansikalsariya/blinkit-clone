import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadImageClodinary = async (image) => {
    if (!image) throw new Error("No image provided for upload");

    console.log("🔄 Uploading to Cloudinary...");

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "binkeyit" },
            (error, uploadResult) => {
                if (error) {
                    console.error(" Cloudinary Upload Error:", error);
                    reject(error);
                } else {
                    console.log(" Cloudinary Upload Success:", uploadResult);
                    resolve(uploadResult);
                }
            }
        );
        uploadStream.end(image.buffer);
    });
};

export default uploadImageClodinary;
