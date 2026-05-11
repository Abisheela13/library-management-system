import Navbar from "./Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card p-4 shadow-sm">

          <h3>User Profile</h3>

          <hr />

          <p><b>Name:</b> {user?.name}</p>
          <p><b>Email:</b> {user?.email}</p>
          <p><b>Role:</b> {user?.role}</p>

        </div>
      </div>
    </>
  );
}

export default Profile;