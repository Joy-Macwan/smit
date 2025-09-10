import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';

const BillHistory = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bill')
      .then(res => res.json())
      .then(data => setBills(data))
      .catch(err => console.error('Error fetching bills:', err));
  }, []);

  return (
    <>
      <Sidebar/>
      <div className="bill-history reveal-up in scale-in">
        <h2 className="gradient-text bounce">📜 Bill History</h2>
        {bills.length === 0 ? (
          <div className="skeleton skeleton-text gradient-text">No bills found.</div>
        ) : (
          <table className="lift reveal-up in">
            <thead>
              <tr className="stagger-children">
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Billing Date</th>
                <th>Grand Total</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody className="stagger-children">
              {bills.map((bill, index) => (
                <tr key={index} className="lift magnetic" style={{animationDelay: `${index * 100}ms`}}>
                  <td className="gradient-text">{bill.customer.name}</td>
                  <td>{bill.customer.phone}</td>
                  <td>{bill.customer.email || 'N/A'}</td>
                  <td>{bill.billingDate}</td>
                  <td className="gradient-text">₹{bill.grandTotal}</td>
                  <td className="gradient-text glow-pulse">₹{bill.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add floating action button */}
        <button className="fab bounce magnetic glow-pulse" onClick={() => window.location.href='/billing'}>
          💰
        </button>
      </div>
    </>
  );
};

export default BillHistory;
