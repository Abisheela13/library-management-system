const express = require("express");

const {
  borrowBook,
  returnBook,
  getBorrowRecords,
  getUserBorrowHistory,
  getMyBorrows
} = require("../controllers/borrowController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* USER */
router.post("/borrow", authMiddleware, borrowBook);
router.post("/return", authMiddleware, returnBook);

/* USER HISTORY (FINE + OVERDUE) */
router.get("/history", authMiddleware, getUserBorrowHistory);

/* SIMPLE USER BORROWS */
router.get("/my", authMiddleware, getMyBorrows);

/* ADMIN */
router.get("/", authMiddleware, adminMiddleware, getBorrowRecords);

module.exports = router;