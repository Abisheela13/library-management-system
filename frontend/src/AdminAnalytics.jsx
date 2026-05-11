import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function AdminAnalytics() {
  const [summary, setSummary] = useState({
    total: 0,
    active: 0,
    returned: 0,
  });

  const token = localStorage.getItem("token");

  // DIRECT USEEFFECT (NO loadData)
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/api/borrow/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const total = res.data.length;
        const active = res.data.filter((b) => !b.returnedAt).length;
        const returned = total - active;

        setSummary({ total, active, returned });
      } catch (err) {
        console.log("Analytics Error:", err);
      }
    })();
  }, []);

  const pieData = [
    { name: "Active", value: summary.active },
    { name: "Returned", value: summary.returned },
  ];

  const barData = [
    { name: "Active", value: summary.active },
    { name: "Returned", value: summary.returned },
  ];

  const COLORS = ["#ff9800", "#4caf50"];

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h3>Admin Analytics Dashboard </h3>

        {/* CARDS */}
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card p-3 text-center shadow">
              <h5>Total</h5>
              <h2>{summary.total}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center shadow">
              <h5>Active</h5>
              <h2 style={{ color: "orange" }}>{summary.active}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center shadow">
              <h5>Returned</h5>
              <h2 style={{ color: "green" }}>{summary.returned}</h2>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="row mt-5">

          {/* PIE */}
          <div className="col-md-6 text-center">
            <h5>Borrow Ratio</h5>

            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* BAR */}
          <div className="col-md-6 text-center">
            <h5>Status Overview</h5>

            <BarChart width={350} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2196f3" />
            </BarChart>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminAnalytics;