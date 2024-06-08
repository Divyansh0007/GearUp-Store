import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
import DisplayOrder from './pages/DisplayOrder';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home,  Products, AboutPage, ContactPage, Cart, Login, Register, PageNotFound, AdminHeader, AdminDashboard, AdminOrders, ListCustomers, Gear} from "./pages"
import Productview from './pages/Productview';
import { Main } from './components';
import Payment from './pages';
 
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <BrowserRouter>
 
      <Routes>
       
        <Route path="/Home" element={<Home />} />
        <Route path="/product" element={<Products />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
  
        <Route path="*" element={<Home />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/AdminHeader" element={<AdminHeader />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/ListCustomers" element={<ListCustomers/>} />
        <Route path="/AdminOrders" element={<AdminOrders/>} />
        <Route path="/Gear" element={<Gear/>}/>
        <Route path="/productview/:id" element={<Productview/>}/>
        <Route path="/displayorder" element={<DisplayOrder />} />
        
         
      </Routes>


     
   
  </BrowserRouter>
);