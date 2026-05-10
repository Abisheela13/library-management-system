const prisma = require("../prismaClient");

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || !book.available) {
      return res.status(400).json({
        message: "Book not available",
      });
    }

    const borrow = await prisma.borrow.create({
      data: {
        userId: req.user.id,
        bookId,
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: {
        available: false,
      },
    });

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const returnBook = async (req, res) => {
  try {

    const borrowId = Number(req.body.borrowId);

    const borrow = await prisma.borrow.update({
      where: {
        id: borrowId,
      },
      data: {
        returnedAt: new Date(),
      },
    });

    await prisma.book.update({
      where: {
        id: borrow.bookId,
      },
      data: {
        available: true,
      },
    });

    res.status(200).json({
      message: "Book returned successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }
};

const getBorrowRecords = async (req, res) => {
  try {
    const records = await prisma.borrow.findMany({
      include: {
        user: true,
        book: true,
      },
    });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowRecords,
};