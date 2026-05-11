const express = require("express");
const router = express.Router();

const prisma = require("../prismaClient");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ADMIN BORROW RECORDS */
router.get(
  "/borrow-records",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const records =
        await prisma.borrow.findMany({
          include: {
            user: true,
            book: true,
          },
          orderBy: {
            borrowedAt: "desc",
          },
        });

      res.json(records);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;