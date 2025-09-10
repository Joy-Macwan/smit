import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaPlus, FaReceipt, FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdFeedback } from 'react-icons/md';
import '../styles/sidebar.css';
import Logo1 from '../assets/Logo1.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Icon (Always visible on mobile) */}
      <button className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <img src={Logo1} className="logoimg" />
        <nav className="sidebar-nav">
          <NavLink to="/" end className="sidebar-link" onClick={closeSidebar}>
            <FaHome className="sidebar-icon" />
            Home
          </NavLink>
          <NavLink to="/products" className="sidebar-link" onClick={closeSidebar}>
            <FaBoxOpen className="sidebar-icon" />
            Product List
          </NavLink>
          <NavLink to="/addproduct" className="sidebar-link" onClick={closeSidebar}>
            <FaPlus className="sidebar-icon" />
            Add Product
          </NavLink>
          <NavLink to="/billing" className="sidebar-link" onClick={closeSidebar}>
            <FaReceipt className="sidebar-icon" />
            Billing
          </NavLink>
          <NavLink to="/aboutus" className="sidebar-link" onClick={closeSidebar}>
            <AiOutlineInfoCircle className="sidebar-icon" />
            About Us
          </NavLink>
          <NavLink to="/feedback" className="sidebar-link" onClick={closeSidebar}>
            <MdFeedback className="sidebar-icon" />
            Feedback
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
