import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import '../styles/invoice.css';

const Invoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: state?.invoiceNumber || "Invoice"
  });

  if (!state) {
    return <div>No invoice data. <button onClick={() => navigate('/billing')}>Back</button></div>;
  }

  const { invoiceNumber, customer, items, date, subtotal, tax, discount, grandTotal, profit } = state;

  return (
    <div className="invoice-page">
      <div className="invoice-actions">
        <button onClick={() => navigate('/billing')}>⬅ Back</button>
        <button onClick={handlePrint}>🖨 Download PDF</button>
      </div>

      <div className="invoice-container" ref={componentRef}>
        <h2>INVOICE</h2>
        <p><strong>Invoice No:</strong> {invoiceNumber}</p>
        <p><strong>Date:</strong> {date}</p>

        <div>
          <p><strong>Customer:</strong> {customer.name}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Email:</strong> {customer.email}</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th><th>Qty</th><th>Price</th><th>Tax</th><th>Discount</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>{item.tax}%</td>
                <td>{item.discount}%</td>
                <td>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-summary">
          <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₹{tax.toFixed(2)}</p>
          <p><strong>Discount:</strong> ₹{discount.toFixed(2)}</p>
          <h3><strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}</h3>
          <p><strong>Profit (10%):</strong> ₹{profit}</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
