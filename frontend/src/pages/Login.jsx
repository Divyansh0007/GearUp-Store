import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { createURL } from "./constant";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onLogin = () => {
    if (email.length === 0) {
      alert("Please enter email");
    } else if (password.length === 0) {
      alert("Please enter password");
    } else {
      const url = createURL(`api/User/login/${email}/${password}`);
      axios.post(url)
        .then((response) => {
          if (response.status === 200) {
            if (email === "Admin@gmail.com" && password === "Admin@123") {
              sessionStorage["token"] = response.data;
              alert("Login Successful");
              navigate('/AdminHeader');
            } else {
              sessionStorage["token"] = response.data;
              alert("Login Successful");
              navigate("/Product");
            }
          } else {
            alert("Please use correct email and password");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert("Invalid credentials. Please try again.");
          } else {
            console.error("An error occurred:", error);
          }
        });
    }
  }

  const onRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'lightblue' }}>
        <div className="container" style={{ marginTop: 150, borderRadius: 10, backgroundColor: "rgba(255, 255, 255, 0.7)", padding: 30, width: '70%', boxShadow: '0px 0px 10px lightblue' }}>
          <h2 className="title" style={{ textAlign: 'center' }}>Login</h2>
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group mb-5 d-flex justify-content-center" style={{ marginTop: '20px' }}>
            <button onClick={onLogin} className="btn btn-success rounded-pill px-3 py-1 me-3" style={{ backgroundColor: '#28a745', color: '#fff' }}>Login</button>
            <button onClick={onRegister} className="btn btn-primary rounded-pill px-3 py-1" style={{ backgroundColor: '#007bff', color: '#fff' }}>Register</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

