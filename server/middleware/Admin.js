import UserModel from "../models/user.model.js";

export const admin = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: No user ID provided.",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        message: "Permission denied: Admins only.",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({
      message: "Internal Server Error.",
      error: true,
      success: false,
    });
  }
};
