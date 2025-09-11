import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaPlus, FaReceipt, FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdFeedback } from 'react-icons/md';
import '../styles/sidebar.css';
import Logo1 from '../assets/Logo1.png';
import { initSidebarEffects } from '../utils/sidebar-effects';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          event.target.className !== 'hamburger' && !event.target.closest('.hamburger')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add escape key listener to close sidebar
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Initialize sidebar effects after component mounts
  useEffect(() => {
    initSidebarEffects();
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  }, [location.pathname]);

  return (
    <>
      {/* Hamburger Icon */}
      <button 
        className="hamburger" 
        onClick={toggleSidebar} 
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={closeSidebar}
        ref={overlayRef}
      ></div>

      {/* Sidebar */}
      <aside 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        ref={sidebarRef}
        aria-hidden={!isOpen && window.innerWidth <= 768}
      >
        <div className="sidebar-brand">
          <img src={Logo1} className="logoimg" alt="SMIT Logo" />
          <h2 className="sidebar-title">SMIT</h2>
        </div>
        
        <div className="nav-group">
          <h3 className="nav-group-title">Main</h3>
          <nav className="sidebar-nav">
            <NavLink to="/" end className="sidebar-link" onClick={closeSidebar}>
              <FaHome className="sidebar-icon" />
              Dashboard
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
          </nav>
        </div>
        
        <div className="nav-group">
          <h3 className="nav-group-title">Information</h3>
          <nav className="sidebar-nav">
            <NavLink to="/aboutus" className="sidebar-link" onClick={closeSidebar}>
              <AiOutlineInfoCircle className="sidebar-icon" />
              About Us
            </NavLink>
            <NavLink to="/feedback" className="sidebar-link" onClick={closeSidebar}>
              <MdFeedback className="sidebar-icon" />
              Feedback
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
