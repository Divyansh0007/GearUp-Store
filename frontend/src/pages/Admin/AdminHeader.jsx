import React, { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthGuard from '../AuthGuard';
import CheckUser from '../CheckUser';


export default function AdminHeader() {
    const [username, setUserName] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage['token'];

    useEffect(() => {
        setUserName(localStorage.getItem("username"));
    }, []);

    if (!token) {
        navigate("/Login");
        alert("Please login");
        return;
    } else {
        var role = CheckUser(token);
        if (role !== "Admin") {
            navigate("/PageNotFound");
            return;
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{ marginLeft: "20px" }}>
                        GearUp Store
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    Admin Page {username}<span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/Gear" className="nav-link">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/ListCustomers" className="nav-link">
                                    Customers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/AdminOrders" className="nav-link">
                                    Orders
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button
                                className="btn btn-outline-success"
                                onClick={(e) => logout(e)}
                                style={{ backgroundColor: 'red', color: 'white' }}
                            >
                                Go Back
                            </button>

                        </form>
                    </div>
                </div>
            </nav>
            <AuthGuard />
        </Fragment>
    );
}

