function Navbar() {

  return (

    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        background: "#111827",
        position: "sticky",
        top: "0",
        zIndex: "1000",
        width: "100%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >

      <div className="container-fluid">

        <h2
          className="fw-bold text-white m-0"
        >
          Library Management System
        </h2>

      </div>

    </nav>

  );
}

export default Navbar;