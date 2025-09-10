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
      <div className="home-container scale-in">
        <h2 className="dashboard-title reveal-fade in gradient-text">Overview</h2>

        <div className="dashboard-cards stagger-children">
          {dashboardStats.totalSales === 0 ? (
            // Skeleton loading state
            Array.from({length: 4}).map((_, index) => (
              <div className="dashboard-card skeleton" key={index}>
                <div className="skeleton-text"></div>
                <div className="skeleton-rect"></div>
              </div>
            ))
          ) : (
            cardData.map((card, index) => (
              <div className="dashboard-card stats-card lift accent-border reveal-up in tilt magnetic glow-pulse" key={index}>
                <div className="stats-card-header">
                  <div className="stats-card-title">{card.title}</div>
                </div>
                <div className="stats-card-value gradient-text">{card.value}</div>
                <div className="stats-card-change positive reveal-up in">Updated just now</div>
              </div>
            ))
          )}
        </div>          <div className="dashboard-section card lift reveal-up in magnetic">
          <h3 className="gradient-text">Recent Transactions</h3>
          <div className="progress-animated" style={{marginBottom: '1rem'}}></div>
          <table className="table">
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
                  <tr key={index} className="lift" style={{transitionDelay: `${index * 100}ms`}}>
                    <td className="gradient-text">{txn.id}</td>
                    <td>{txn.customer}</td>
                    <td>₹{txn.amount.toLocaleString()}</td>
                    <td><span className="badge badge-primary">{txn.payment}</span></td>
                    <td>{txn.date}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5"><div className="skeleton-text"></div></td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section top-products card headered lift reveal-up in tilt">
          <h3 className="gradient-text">Top Selling Products</h3>
          <ul className="stagger-children">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <li key={index} className="magnetic bounce">{product.name} - <span className="gradient-text">{product.sold}</span> sold</li>
              ))
            ) : (
              Array.from({length: 3}).map((_, index) => (
                <li key={index}><div className="skeleton-text"></div></li>
              ))
            )}
          </ul>
        </div>

        {/* Add floating action button */}
        <button className="fab bounce" onClick={() => window.location.href='/addproduct'}>
          +
        </button>        <div className="dashboard-row stagger-children">
          <div className="dashboard-section sales-overview card lift reveal-up in tilt">
            <h3 className="gradient-text">Sales Overview</h3>
            <div className="progress-animated" style={{marginBottom: '1rem'}}></div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-section payment-overview card lift reveal-up in tilt glow-pulse">
            <h3 className="gradient-text">Payment Methods Breakdown</h3>
            <div className="progress-animated" style={{marginBottom: '1rem'}}></div>
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
