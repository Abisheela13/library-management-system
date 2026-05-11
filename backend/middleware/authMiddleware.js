const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
};

module.exports = adminMiddleware;