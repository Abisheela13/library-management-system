const express = require("express");

const {
  borrowBook,
  returnBook,
  approveReturn,
  getBorrowRecords,
  getUserBorrowHistory,
  getMyBorrows,
} = require("../controllers/borrowController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* ---------------- USER ---------------- */
router.post("/borrow", authMiddleware, borrowBook);
router.post("/return", authMiddleware, returnBook);
router.get("/my", authMiddleware, getMyBorrows);
router.get("/history", authMiddleware, getUserBorrowHistory);

/* ---------------- ADMIN ---------------- */
router.get("/", authMiddleware, adminMiddleware, getBorrowRecords);

//  THIS IS WHERE YOU ADD approve-return (IMPORTANT)
router.post(
  "/approve-return",
  authMiddleware,
  adminMiddleware,
  approveReturn
);

module.exports = router;