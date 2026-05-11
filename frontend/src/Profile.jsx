function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="container">

      <div
        className="card shadow border-0 p-5"
        style={{
          borderRadius: "20px",
        }}
      >

        <h2 className="mb-4">
          User Profile
        </h2>

        <hr />

        <h5>
          Name:
        </h5>

        <p>{user?.name}</p>

        <h5>
          Email:
        </h5>

        <p>{user?.email}</p>

        <h5>
          Role:
        </h5>

        <p>{user?.role}</p>

        <h5>
          Borrow Limit:
        </h5>

        <p>2 Books Maximum</p>

        <h5>
          Borrow Duration:
        </h5>

        <p>7 Days</p>

        <h5>
          Fine:
        </h5>

        <p>₹10 Per Extra Day</p>

      </div>

    </div>
  );
}

export default Profile;