import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

import Dashboard from "./Dashboard";
import BorrowHistory from "./BorrowHistory";
import Profile from "./Profile";

import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminBorrowRequests from "./AdminBorrowRequests";
import AdminHistory from "./AdminHistory";
import AdminAnalytics from "./AdminAnalytics";

import AdminRoute from "./AdminRoute";

import UserLayout from "./UserLayout";
import BorrowedBooks from "./BorrowedBooks";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<BorrowHistory />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="borrow"
            element={<AdminBorrowRequests />}
          />

          <Route
            path="history"
            element={<AdminHistory />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

        </Route>



        {/* USER */}
<Route path="/" element={<UserLayout />}>

  <Route
    path="dashboard"
    element={<Dashboard />}
  />

  <Route
    path="borrowed"
    element={<BorrowedBooks />}
  />

  <Route
    path="history"
    element={<BorrowHistory />}
  />

  <Route
    path="profile"
    element={<Profile />}
  />

</Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
