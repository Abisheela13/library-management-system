const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", authMiddleware, getBooks);

router.post("/", authMiddleware, addBook);

router.put("/:id", authMiddleware, updateBook);

router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
