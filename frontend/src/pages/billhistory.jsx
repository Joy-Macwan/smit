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
    <div className="bill-history">
      <h2>📜 Bill History</h2>
      {bills.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Billing Date</th>
              <th>Grand Total</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index}>
                <td>{bill.customer.name}</td>
                <td>{bill.customer.phone}</td>
                <td>{bill.customer.email || 'N/A'}</td>
                <td>{bill.billingDate}</td>
                <td>₹{bill.grandTotal}</td>
                <td>₹{bill.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default BillHistory;
