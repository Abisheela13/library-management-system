const prisma = require("../prismaClient");

/* ---------------- BORROW BOOK ---------------- */
const borrowBook = async (req, res) => {

  try {

    const { bookId } = req.body;

    /* FIND BOOK */
    const book = await prisma.book.findUnique({
      where: {
        id: Number(bookId),
      },
    });

    /* BOOK NOT FOUND */
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    /* OUT OF STOCK */
    if (book.available <= 0) {
      return res.status(400).json({
        message: "Book out of stock",
      });
    }

    /* CHECK USER ALREADY BORROWED */
    const alreadyBorrowed = await prisma.borrow.findFirst({
      where: {
        userId: req.user.id,
        bookId: Number(bookId),
        returnedAt: null,
      },
    });

    if (alreadyBorrowed) {
      return res.status(400).json({
        message: "You already borrowed this book",
      });
    }

    /* CREATE BORROW */
    const borrow = await prisma.borrow.create({
      data: {
        userId: req.user.id,
        bookId: Number(bookId),

        borrowedAt: new Date(),

        dueDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),

        status: "BORROWED",
      },
    });

    /* REDUCE AVAILABLE COUNT */
    await prisma.book.update({
      where: {
        id: Number(bookId),
      },
      data: {
        available: {
          decrement: 1,
        },
      },
    });

    res.json({
      message: "Book Borrowed Successfully",
      borrow,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/* ---------------- RETURN BOOK ---------------- */
const returnBook = async (req, res) => {

  try {

    const { borrowId } = req.body;

    /* FIND BORROW */
    const borrow = await prisma.borrow.findUnique({
      where: {
        id: Number(borrowId),
      },
    });

    /* NOT FOUND */
    if (!borrow) {
      return res.status(404).json({
        message: "Borrow record not found",
      });
    }

    /* ALREADY RETURNED */
    if (borrow.returnedAt) {
      return res.status(400).json({
        message: "Book already returned",
      });
    }

    /* UPDATE RETURN */
    const updated = await prisma.borrow.update({
      where: {
        id: Number(borrowId),
      },
      data: {
        returnedAt: new Date(),
        status: "RETURNED",
      },
    });

    /* INCREASE AVAILABLE */
    await prisma.book.update({
      where: {
        id: borrow.bookId,
      },
      data: {
        available: {
          increment: 1,
        },
      },
    });

    res.json({
      message: "Book Returned Successfully",
      updated,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/* ---------------- ADMIN APPROVE RETURN ---------------- */
const approveReturn = async (req, res) => {

  try {

    const { borrowId } = req.body;

    const borrow = await prisma.borrow.findUnique({
      where: {
        id: Number(borrowId),
      },
    });

    if (!borrow) {
      return res.status(404).json({
        message: "Borrow not found",
      });
    }

    /* ALREADY RETURNED */
    if (borrow.returnedAt) {
      return res.status(400).json({
        message: "Already returned",
      });
    }

    /* UPDATE */
    const updated = await prisma.borrow.update({
      where: {
        id: Number(borrowId),
      },
      data: {
        returnedAt: new Date(),
        status: "RETURNED",
      },
    });

    /* INCREASE STOCK */
    await prisma.book.update({
      where: {
        id: borrow.bookId,
      },
      data: {
        available: {
          increment: 1,
        },
      },
    });

    res.json({
      message: "Return Approved",
      updated,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/* ---------------- ADMIN RECORDS ---------------- */
const getBorrowRecords = async (req, res) => {

  try {

    const data = await prisma.borrow.findMany({
      include: {
        user: true,
        book: true,
      },
      orderBy: {
        borrowedAt: "desc",
      },
    });

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/* ---------------- USER HISTORY ---------------- */
const getUserBorrowHistory = async (req, res) => {

  try {

    const records = await prisma.borrow.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        book: true,
      },
      orderBy: {
        borrowedAt: "desc",
      },
    });

    const formatted = records.map((r) => {

      const endDate =
        r.returnedAt || new Date();

      const daysUsed =
        Math.ceil(
          (endDate - r.borrowedAt) /
          (1000 * 60 * 60 * 24)
        );

      const overdueDays =
        daysUsed > 7
          ? daysUsed - 7
          : 0;

      const fine =
        overdueDays * 10;

      return {
        id: r.id,
        book: r.book?.title || "Unknown",
        borrowedAt: r.borrowedAt,
        returnedAt: r.returnedAt,
        dueDate: r.dueDate,
        daysUsed,
        overdueDays,
        fine,
        status: r.status,
      };

    });

    res.json(formatted);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/* ---------------- MY BORROWS ---------------- */
const getMyBorrows = async (req, res) => {

  try {

    const records = await prisma.borrow.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        book: true,
      },
      orderBy: {
        borrowedAt: "desc",
      },
    });

    res.json(records);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  borrowBook,
  returnBook,
  approveReturn,
  getBorrowRecords,
  getUserBorrowHistory,
  getMyBorrows,
};