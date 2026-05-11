import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AdminAnalytics() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        setLoading(true);

        const response = await API.get(
          "/api/borrow",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecords(response.data || []);

      } catch (error) {

        console.log(error);

        alert("Failed to load analytics");

      } finally {

        setLoading(false);

      }

    };

    fetchAnalytics();

  }, []);

  const totalBorrows = records.length;

  const returnedBooks = records.filter(
    (r) => r.returnedAt
  ).length;

  const pendingBooks = records.filter(
    (r) => !r.returnedAt
  ).length;

  /* GRAPH DATA */
  const chartData = [
    {
      name: "Returned",
      value: returnedBooks,
    },
    {
      name: "Pending",
      value: pendingBooks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h1 className="mb-4">
          Analytics
        </h1>

        {/* LOADING */}
        {loading && (
          <h5>Loading...</h5>
        )}

        {/* CARDS */}
        <div className="row">

          <div className="col-md-4 mb-4">

            <div className="card p-4 shadow-sm h-100">

              <h3>Total Borrows</h3>

              <h1>{totalBorrows}</h1>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card p-4 shadow-sm h-100">

              <h3>Returned Books</h3>

              <h1>{returnedBooks}</h1>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card p-4 shadow-sm h-100">

              <h3>Pending Returns</h3>

              <h1>{pendingBooks}</h1>

            </div>

          </div>

        </div>

        {/* GRAPH */}
        <div className="card p-4 shadow-sm mt-4">

          <h3 className="mb-4">
            Borrow Analytics Graph
          </h3>

          <div style={{ width: "100%", height: 400 }}>

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  dataKey="value"
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminAnalytics;