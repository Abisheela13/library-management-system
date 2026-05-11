const prisma = require("../prismaClient");

// GET BOOKS
const getBooks = async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

// ADD BOOK
const addBook = async (req, res) => {
  const { title, author, quantity } = req.body;

  const book = await prisma.book.create({
    data: {
      title,
      author,
      quantity: Number(quantity),
    },
  });

  res.json(book);
};

// UPDATE BOOK
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, quantity } = req.body;

  const book = await prisma.book.update({
    where: { id: Number(id) },
    data: {
      title,
      author,
      quantity,
    },
  });

  res.json(book);
};

// DELETE BOOK
const deleteBook = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.borrow.deleteMany({ where: { bookId: id } });

  await prisma.book.delete({ where: { id } });

  res.json({ message: "Deleted" });
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};