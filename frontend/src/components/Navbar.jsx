import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import  { Fragment } from 'react';
const token= sessionStorage["token"];
const Navbar = () => {
    const [username, setUserName] = useState("");

    useEffect(() => {
        setUserName(localStorage.getItem("username"));
    }, []);

    const logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light py-1 sticky-top" style={{backgroundColor: '#f0f0f0'}}>
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">GearUp Store </NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                                <NavLink className="nav-link" to="/displayOrder">Your Orders</NavLink>
                        </li>
                    </ul>
                    {sessionStorage.length > 0 && (
                        <ul className="navbar-nav ml-auto my-2 text-center">
                            <li className="nav-item">
                            <NavLink to="/Cart" className="btn btn-outline-dark m-2 d-flex align-items-center"><i className="fa fa-cart-shopping mr-1"></i> Cart </NavLink>
                            </li>
                            <li>
                            <NavLink><button className="btn btn-outline-dark m-2" onClick={logout}><i className="fa fa-sign-in-alt mr-1"></i>Logout</button>
                            </NavLink> 
                            </li> 
                        </ul>
                    )}
                    {sessionStorage.length === 0 && (
                        <div className="buttons text-center ml-auto">
                            <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i>Login</NavLink>
                            <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa  mr-1"></i>Register</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
