import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log(" Incoming Request");
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers.authorization);

    const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      console.log("Token missing!");
      return res.status(401).json({ message: "Provide token", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Verified:", decoded);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(" Token Verification Error:", error.message);

    return res.status(401).json({
      message: error.message === "jwt expired" ? "Token expired. Please login again." : "Invalid token",
      error: error.message,
      success: false,
    });
  }
};

export default auth;
