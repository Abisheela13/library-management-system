import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./Login";
import Register from "./Register";

// USER
import Dashboard from "./Dashboard";
import BorrowHistory from "./BorrowHistory";
import Profile from "./Profile";

// ADMIN
import AdminAnalytics from "./AdminAnalytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<BorrowHistory />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN */}
        <Route path="/admin-analytics" element={<AdminAnalytics />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;