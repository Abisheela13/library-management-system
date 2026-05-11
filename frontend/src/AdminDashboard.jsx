import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    quantity: "",
  });

  const [editBookId, setEditBookId] = useState(null);

  /* GET BOOKS */
  useEffect(() => {

    const getBooks = async () => {

      try {

        const res = await API.get(
          "/api/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBooks(res.data);

      } catch (err) {

        console.log(err);

        alert("Failed to load books");

      }
    };

    getBooks();

  }, [token]);

  /* HANDLE INPUT */
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /* EDIT */
  const handleEdit = (book) => {

    setEditBookId(book.id);

    setFormData({
      title: book.title,
      author: book.author,
      quantity: book.quantity,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  /* ADD / UPDATE BOOK */
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        title: formData.title,
        author: formData.author,
        quantity: Number(formData.quantity),
      };

      /* UPDATE */
      if (editBookId) {

        await API.put(
          `/api/books/${editBookId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Book Updated");

      }

      /* ADD */
      else {

        await API.post(
          "/api/books",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Book Added");

      }

      /* RELOAD BOOKS */
      const res = await API.get(
        "/api/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(res.data);

      /* RESET */
      setFormData({
        title: "",
        author: "",
        quantity: "",
      });

      setEditBookId(null);

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Operation Failed"
      );

    }
  };

  /* DELETE */
  const deleteBook = async (id) => {

    try {

      await API.delete(
        `/api/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Deleted");

      const res = await API.get(
        "/api/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(res.data);

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }
  };

  /* LOGOUT */
  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <>
      <Navbar />

      <div
        className="container py-5"
      >

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Welcome {user?.name}
            </p>
          </div>

          <button
            className="btn btn-dark"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* FORM */}

        <div className="card p-4 mb-5">

          <h3 className="mb-4">

            {
              editBookId
                ? "Edit Book"
                : "Add Book"
            }

          </h3>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-4 mb-3">

                <input
                  type="text"
                  name="title"
                  placeholder="Book Title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  className="form-control"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-2 mb-3">

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-2 mb-3">

                <button
                  className="btn btn-dark w-100"
                >

                  {
                    editBookId
                      ? "Update"
                      : "Add"
                  }

                </button>

              </div>

            </div>

          </form>

        </div>

        {/* BOOKS */}

        <div className="row">

          {
            books.map((book) => (

              <div
                className="col-md-4 mb-4"
                key={book.id}
              >

                <div className="card p-4 h-100">

                  <h4>{book.title}</h4>

                  <p>{book.author}</p>

                  <p>
                    Quantity: {book.quantity}
                  </p>

                  <p>
                    Available: {book.available}
                  </p>

                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-warning w-50"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger w-50"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))
          }

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;