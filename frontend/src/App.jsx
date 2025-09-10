import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Forgotpassword from './pages/forgotpassword';
import Home from './pages/home';
import AddProduct from './pages/addproduct';
import EditProduct from "./pages/editproduct";
import Billing from './pages/billing';
import BillSummary from './pages/billsummary';
import NotFound from './pages/notfound';
import ProductList from './pages/productlist';
import Feedback from './pages/feedback';
import Aboutus from './pages/aboutus';
import Invoice from './pages/invoice';
import './App.css'

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
