import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import Sidebar from '../components/sidebar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Home = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    todaysBills: 0,
    pendingOrders: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setDashboardStats({
        totalSales: 125000,
        totalProducts: 256,
        todaysBills: 34,
        pendingOrders: 7,
      });

      setRecentTransactions([
        { id: '#2051', customer: 'Amit Kumar', amount: 1200, payment: 'Cash', date: 'July 11, 2025' },
        { id: '#2050', customer: 'Neha Sharma', amount: 2450, payment: 'UPI', date: 'July 11, 2025' },
        { id: '#2049', customer: 'John D.', amount: 800, payment: 'Card', date: 'July 10, 2025' },
      ]);

      setTopProducts([
        { name: 'Product A', sold: 120 },
        { name: 'Product B', sold: 95 },
        { name: 'Product C', sold: 78 },
      ]);
    }, 1000);
  }, []);

  const cardData = [
    { title: 'Total Sales', value: `₹${dashboardStats.totalSales.toLocaleString()}` },
    { title: 'Total Products', value: dashboardStats.totalProducts },
    { title: "Today's Bills", value: dashboardStats.todaysBills },
    { title: 'Pending Orders', value: dashboardStats.pendingOrders },
  ];

  const barData = [
    { name: 'Mon', sales: 2400 },
    { name: 'Tue', sales: 1398 },
    { name: 'Wed', sales: 9800 },
    { name: 'Thu', sales: 3908 },
    { name: 'Fri', sales: 4800 },
    { name: 'Sat', sales: 3800 },
    { name: 'Sun', sales: 4300 },
  ];

  const pieData = [
    { name: 'Cash', value: 400 },
    { name: 'Card', value: 300 },
    { name: 'UPI', value: 300 },
  ];

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <>
      <Sidebar />
      <div className="home-container">
        <h2 className="dashboard-title">Retail Billing Dashboard</h2>

        <div className="dashboard-cards">
          {cardData.map((card, index) => (
            <div className="dashboard-card" key={index}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <h3>Recent Transactions</h3>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((txn, index) => (
                  <tr key={index}>
                    <td>{txn.id}</td>
                    <td>{txn.customer}</td>
                    <td>₹{txn.amount.toLocaleString()}</td>
                    <td>{txn.payment}</td>
                    <td>{txn.date}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5">Loading...</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section top-products">
          <h3>Top Selling Products</h3>
          <ul>
            {topProducts.map((product, index) => (
              <li key={index}>{product.name} - {product.sold} sold</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-section sales-overview">
            <h3>Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-section payment-overview">
            <h3>Payment Methods Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
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
};

export default Home;
