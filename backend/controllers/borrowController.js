const prisma = require("../prismaClient");

/* ---------------- BORROW BOOK ---------------- */
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    const activeBorrows = await prisma.borrow.count({
      where: {
        bookId: Number(bookId),
        returnedAt: null,
      },
    });

    if (activeBorrows >= book.quantity) {
      return res.status(400).json({ message: "No stock available" });
    }

    const borrow = await prisma.borrow.create({
      data: {
        userId: req.user.id,
        bookId: Number(bookId),
      },
    });

    await prisma.book.update({
      where: { id: Number(bookId) },
      data: {
        available: activeBorrows + 1 < book.quantity,
      },
    });

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------------- RETURN BOOK ---------------- */
const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await prisma.borrow.findUnique({
      where: { id: Number(borrowId) },
    });

    if (!borrow) return res.status(404).json({ message: "Not found" });

    if (borrow.returnedAt) {
      return res.status(400).json({ message: "Already returned" });
    }

    const updated = await prisma.borrow.update({
      where: { id: Number(borrowId) },
      data: { returnedAt: new Date() },
    });

    res.json({ message: "Returned", updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------------- ADMIN RECORDS ---------------- */
const getBorrowRecords = async (req, res) => {
  try {
    const data = await prisma.borrow.findMany({
      include: { user: true, book: true },
      orderBy: { borrowedAt: "desc" },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------------- USER HISTORY + FINE ---------------- */
const getUserBorrowHistory = async (req, res) => {
  try {
    const records = await prisma.borrow.findMany({
      where: { userId: req.user.id },
      include: { book: true },
      orderBy: { borrowedAt: "desc" },
    });

    const formatted = records.map((r) => {
      const end = r.returnedAt || new Date();
      const daysUsed = Math.ceil((end - r.borrowedAt) / (1000 * 60 * 60 * 24));

      const overdueDays = daysUsed > 7 ? daysUsed - 7 : 0;
      const fine = overdueDays * 10;

      return {
        id: r.id,
        book: r.book.title,
        borrowedAt: r.borrowedAt,
        returnedAt: r.returnedAt,
        daysUsed,
        overdueDays,
        fine,
        status: r.returnedAt ? "Returned" : "Borrowed",
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------------- MY BORROWS ---------------- */
const getMyBorrows = async (req, res) => {
  try {
    const records = await prisma.borrow.findMany({
      where: { userId: req.user.id },
      include: { book: true },
      orderBy: { borrowedAt: "desc" },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------------- EXPORT ---------------- */
module.exports = {
  borrowBook,
  returnBook,
  getBorrowRecords,
  getUserBorrowHistory,
  getMyBorrows,
};