import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Forgotpassword from './pages/forgotpassword';
import Home from './pages/home';
import AddProduct from './pages/addproduct';
import EditProduct from './pages/editproduct';
import Billing from './pages/billing';
import BillSummary from './pages/billsummary';
import NotFound from './pages/notfound';
import ProductList from './pages/productlist';
import Feedback from './pages/feedback';
import Aboutus from './pages/aboutus';
import Invoice from './pages/invoice';
// Modern UI: no futuristic demo

// Import all CSS files
import './App.css';
import './styles/animations.css';
import './styles/modern-components.css';
import './styles/utilities.css';
import './styles/motion.css';
import './styles/marketing.css';
import './styles/enhancements.css';
import { useEffect } from 'react';
import { initRevealOnScroll } from './utils/motion';

function RouteMotionWrapper({ children }) {
  const location = useLocation();
  useEffect(() => {
    // Re-init reveal animations when route changes
    const t = setTimeout(() => initRevealOnScroll(), 0);
    return () => clearTimeout(t);
  }, [location]);
  return children;
}

function App() {
  return (
    <div className="App">
      <Router>
        <RouteMotionWrapper>
          <div className="main-content page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/billsummary" element={<BillSummary />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </RouteMotionWrapper>
      </Router>
    </div>
  );
}

export default App;
