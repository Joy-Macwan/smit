import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/billing.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/sidebar';
import logo from '../assets/Logo1.png';

const Billing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [tax, setTax] = useState('');
  const [discount, setDiscount] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });

  const invoiceRef = useRef();
  const billingDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const datePart = billingDate.replace(/-/g, '');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    setInvoiceNumber(`INV-${datePart}-${randomPart}`);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error('Failed to load products.');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      const found = products.find(p => p._id === selectedProductId || p.id === selectedProductId);
      if (found) setSelectedProduct(found);
    }
  }, [selectedProductId, products]);

  const addToBill = (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) {
      toast.error('Please select a product and quantity.');
      return;
    }

    const qty = parseInt(quantity);
    const taxVal = parseFloat(tax || 0);
    const discountVal = parseFloat(discount || 0);

    const base = selectedProduct.price * qty;
    const taxAmt = (base * taxVal) / 100;
    const discountAmt = (base * discountVal) / 100;
    const total = base + taxAmt - discountAmt;

    const newItem = {
      ...selectedProduct,
      quantity: qty,
      tax: taxVal,
      discount: discountVal,
      total,
    };

    setBillItems(prev => [...prev, newItem]);
    setSelectedProductId('');
    setSelectedProduct(null);
    setQuantity('');
    setTax('');
    setDiscount('');
    toast.success(`${selectedProduct.name} added to invoice.`);
  };

  const getSubtotal = () => billItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getTotalTax = () => billItems.reduce((sum, item) => sum + ((item.price * item.quantity * item.tax) / 100), 0);
  const getTotalDiscount = () => billItems.reduce((sum, item) => sum + ((item.price * item.quantity * item.discount) / 100), 0);
  const getGrandTotal = () => (getSubtotal() + getTotalTax() - getTotalDiscount()).toFixed(2);
  const getProfit = () => (parseFloat(getGrandTotal()) * 0.10).toFixed(2);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: invoiceNumber,
  });

  const generatePDF = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    return pdf;
  };

  const handleDownloadPDF = async () => {
    const pdf = await generatePDF();
    pdf.save(`${invoiceNumber}.pdf`);
  };

  const handleEmailPDF = async () => {
    const pdf = await generatePDF();

    try {
      const blob = pdf.output('blob');
      const formData = new FormData();
      formData.append('file', blob, `${invoiceNumber}.pdf`);
      formData.append('email', customer.email);
      formData.append('name', customer.name);

      const res = await fetch('http://localhost:5000/api/invoice/send-invoice', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert(`✅ Invoice sent to ${customer.email}`);
      } else {
        alert(`❌ Failed to send email: ${data.message}`);
      }
    } catch (err) {
      alert('❌ Error sending invoice email');
      console.error(err);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="billing scale-in reveal-up in">
        <ToastContainer />
        <h2 className="gradient-text bounce">💰 Billing System</h2>

        <form onSubmit={addToBill} className="billing-form reveal-up in stagger-children">
          <div className="form-row">
            <div className="input-group lift magnetic">
              <input type="text" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required placeholder=" " />
              <label>Customer Name</label>
            </div>
            <div className="input-group lift magnetic">
              <input type="text" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} required placeholder=" " />
              <label>Phone</label>
            </div>
            <div className="input-group lift magnetic">
              <input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder=" " />
              <label>Email</label>
            </div>
            <div className="input-group lift magnetic">
              <input type="date" value={billingDate} disabled />
              <label>Billing Date</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group lift magnetic">
              <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)} required>
                <option value="" disabled hidden>Select Product</option>
                {products.map(p => <option key={p._id || p.id} value={p._id || p.id}>{p.name} — ₹{p.price}</option>)}
              </select>
              <label>Select Product</label>
            </div>
            <div className="input-group lift magnetic">
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required placeholder=" " />
              <label>Quantity</label>
            </div>
            <div className="input-group lift magnetic">
              <input type="number" min="0" value={tax} onChange={(e) => setTax(e.target.value)} placeholder=" " />
              <label>Tax %</label>
            </div>
            <div className="input-group lift magnetic">
              <input type="number" min="0" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder=" " />
              <label>Discount %</label>
            </div>
          </div>

          <div className="form-row button-row stagger-children">
            <button type="submit" className="btn cta lift magnetic ripple glow-pulse">➕ Add Item</button>
            {billItems.length > 0 && (
              <>
                <button type="button" className="btn btn-ghost lift ripple magnetic" onClick={handlePrint}>🖨 Print</button>
                <button type="button" className="btn btn-secondary lift ripple magnetic" onClick={handleDownloadPDF}>📥 Download PDF</button>
                <button type="button" className="btn btn-primary cta lift ripple magnetic bounce" onClick={handleEmailPDF}>✉️ Email PDF</button>
              </>
            )}
          </div>
        </form>

        <div className="pdf-container tilt reveal-up in magnetic" ref={invoiceRef}>
          <div className="bill-items">
            <div className="invoice-header stagger-children">
              <img src={logo} alt="Logo" className="lift bounce" />
              <h2 className="gradient-text">INVOICE</h2>
              <p><strong>Invoice #:</strong> <span className="gradient-text">{invoiceNumber}</span></p>
              <p><strong>Date:</strong> {billingDate}</p>
            </div>
            <p><strong>Customer:</strong> {customer.name} | <strong>Phone:</strong> {customer.phone} | <strong>E-mail:</strong> {customer.email}</p>

            {billItems.length > 0 && (
              <>
                <table className="lift">
                  <thead>
                    <tr className="stagger-children">
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Tax %</th>
                      <th>Discount %</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="stagger-children">
                    {billItems.map((item, index) => (
                      <tr key={index} className="lift" style={{animationDelay: `${index * 100}ms`}}>
                        <td className="gradient-text">{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}</td>
                        <td>{item.tax}</td>
                        <td>{item.discount}</td>
                        <td className="gradient-text">₹{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="summary stagger-children reveal-up in">
                  <p className="lift">Subtotal: <span className="gradient-text">₹{getSubtotal()}</span></p>
                  <p className="lift">Total Tax: <span className="gradient-text">₹{getTotalTax().toFixed(2)}</span></p>
                  <p className="lift">Total Discount: <span className="gradient-text">₹{getTotalDiscount().toFixed(2)}</span></p>
                  <h3 className="gradient-text bounce glow-pulse">Grand Total: ₹{getGrandTotal()}</h3>
                  <p style={{ color: '#28a745' }} className="gradient-text bounce">Profit (10%): ₹{getProfit()}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add floating action button */}
        <button className="fab bounce magnetic glow-pulse" onClick={() => window.location.href='/billhistory'}>
          📋
        </button>
      </div>
    </>
  );
};

export default Billing;
