const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();


// view books → logged in users
router.get(
  "/",
  authMiddleware,
  getBooks
);


// add book -> admin only
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addBook
);


// update book -> admin only
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateBook
);


// delete book ->admin only
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteBook
);

module.exports = router;