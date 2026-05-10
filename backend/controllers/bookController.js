const prisma = require("../prismaClient");

const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, available } = req.body;

    const updatedBook = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        author,
        available,
      },
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

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

    res.status(200).json({
      message: "Book deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};