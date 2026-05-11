const prisma = require("../prismaClient");

/* GET BOOKS */
const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(books);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ADD BOOK */
const addBook = async (req, res) => {
  try {

    const {
      title,
      author,
      quantity,
    } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        quantity: Number(quantity),
        available: Number(quantity),
      },
    });

    res.json(book);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* UPDATE BOOK */
const updateBook = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      title,
      author,
      quantity,
    } = req.body;

    const existing = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    const borrowedCount =
      existing.quantity - existing.available;

    const updatedAvailable =
      Number(quantity) - borrowedCount;

    const book = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        author,
        quantity: Number(quantity),
        available: updatedAvailable,
      },
    });

    res.json(book);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE */
const deleteBook = async (req, res) => {
  try {

    const id = Number(req.params.id);

    await prisma.borrow.deleteMany({
      where: {
        bookId: id,
      },
    });

    await prisma.book.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Book deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};