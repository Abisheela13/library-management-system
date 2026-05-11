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

  /* FETCH BOOKS */
  const fetchBooks = async () => {

    try {

      const response = await API.get(
        "/api/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch books");

    }
  };

  /* LOAD BOOKS */
   useEffect(() => {

  const loadBooks = async () => {

    try {

      const response = await API.get(
        "/api/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch books");

    }

  };

  loadBooks();

}, []);

  /* HANDLE EDIT */
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

  /* HANDLE CHANGE */
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

        alert("Book Updated Successfully");

        setEditBookId(null);

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

        alert("Book Added Successfully");

      }

      /* CLEAR FORM */
      setFormData({
        title: "",
        author: "",
        quantity: "",
      });

      /* REFRESH */
      fetchBooks();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
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

      alert("Book Deleted Successfully");

      fetchBooks();

    } catch (error) {

      console.log(error);

      alert("Failed to delete book");

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
        className="container-fluid px-4 px-md-5 py-5"
        style={{
          minHeight: "100vh",
          background: "#f5f7fb"
        }}
      >

        <div
          className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-5 gap-3"
        >

          <div>

            <h1
              className="fw-bold mb-2"
              style={{
                fontSize: "3rem",
                color: "#111827"
              }}
            >
              Admin Dashboard
            </h1>

            <p
              className="mb-0"
              style={{
                color: "#6b7280",
                fontSize: "1.1rem"
              }}
            >
              Welcome, {user?.name}
            </p>

          </div>

          <button
            className="btn btn-dark px-4 py-3"
            onClick={handleLogout}
            style={{
              borderRadius: "14px",
              fontWeight: "600"
            }}
          >
            Logout
          </button>

        </div>

        {/* FORM */}
        <div
          className="card border-0 shadow-sm p-4 mb-5"
          style={{
            borderRadius: "24px",
            background: "#ffffff"
          }}
        >

          <h3 className="fw-bold mb-4">

            {
              editBookId
                ? "Edit Book"
                : "Add New Book"
            }

          </h3>

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* TITLE */}
              <div className="col-lg-4 mb-3">

                <input
                  type="text"
                  name="title"
                  placeholder="Book Title"
                  className="form-control py-3 px-4"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "14px"
                  }}
                />

              </div>

              {/* AUTHOR */}
              <div className="col-lg-4 mb-3">

                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  className="form-control py-3 px-4"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "14px"
                  }}
                />

              </div>

              {/* QUANTITY */}
              <div className="col-lg-2 mb-3">

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="form-control py-3 px-4"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "14px"
                  }}
                />

              </div>

              {/* BUTTON */}
              <div className="col-lg-2 mb-3">

                <button
                  className="btn btn-dark w-100 py-3"
                  style={{
                    borderRadius: "14px",
                    fontWeight: "600"
                  }}
                >

                  {
                    editBookId
                      ? "Update"
                      : "Add Book"
                  }

                </button>

              </div>

            </div>

          </form>

        </div>

        {/* BOOK LIST */}
        <div className="row">

          {
            books?.map((book) => (

              <div
                className="col-sm-6 col-xl-4 mb-4"
                key={book.id}
              >

                <div
                  className="card border-0 shadow-sm h-100 p-4"
                  style={{
                    borderRadius: "24px",
                    background: "#ffffff"
                  }}
                >

                  <h3 className="fw-bold mb-2">
                    {book.title}
                  </h3>

                  <p
                    className="mb-2"
                    style={{
                      color: "#6b7280"
                    }}
                  >
                    {book.author}
                  </p>

                  <p>
                    <strong>Total Quantity:</strong>{" "}
                    {book.quantity}
                  </p>

                  <p>
                    <strong>Available:</strong>{" "}

                    <span
                      className={
                        book.available > 0
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {book.available}
                    </span>
                  </p>

                  <div className="d-flex gap-2 mt-auto">

                    <button
                      className="btn btn-warning w-50 py-3"
                      onClick={() => handleEdit(book)}
                      style={{
                        borderRadius: "14px",
                        fontWeight: "600"
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger w-50 py-3"
                      onClick={() => deleteBook(book.id)}
                      style={{
                        borderRadius: "14px",
                        fontWeight: "600"
                      }}
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