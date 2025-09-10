import React, { useRef } from 'react';
import '../styles/billsummary.css';

const BillSummary = ({ totalItems = 0, totalAmount = 0 }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="bill-summary-container">
      <div className="bill-summary" ref={printRef}>
        <h2>🧾 Bill Summary</h2>
        <p>Total Items: <span>{totalItems}</span></p>
        <p>Total Amount: <span>${totalAmount.toFixed(2)}</span></p>
      </div>
      <button onClick={handlePrint}>🖨️ Print Bill</button>
    </div>
  );
};

export default BillSummary;
