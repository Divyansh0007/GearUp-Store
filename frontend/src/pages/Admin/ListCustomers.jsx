import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AuthGuard from "../AuthGuard";
import "./ListCustomer.css";

const ListCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const jwtToken = sessionStorage.getItem("token");
        const response = await fetch("https://localhost:7257/api/User", {
          headers: {
            Authorization: `bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch customer list");
        }

        const data = await response.json();
        setCustomerList(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCustomerList();
  }, []);

  const handleAddCustomer = () => {
    navigate("/add-customer");
  };

  return (
    <div className="container my-5">
      <AdminHeader />
      <h1 className="text-center mb-5 text-primary">List Of Customers</h1>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped mb-0 table-light">
              <thead className="thead-light">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        </div>
      </div>
      <AuthGuard />
    </div>
  );
};

export default ListCustomer;
