import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Header from "./AdminHeader";
import { createURL } from "../constant";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import AuthGuard from "../AuthGuard";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../Productview";
import CheckUser from "../CheckUser";

export default function AdminOrders() {
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [orderNo, setOrderNo] = useState("")
  const [orderStatus, setOrderStatus] = useState("");
  const [show, setShow] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const nevigate=useNavigate();
  const token=sessionStorage['token'];
  const handleClose = () => setShow(false);
  const handleCloseOrderStatus = () => setShowOrderStatus(false);

  useEffect(() => {
    // getData("Admin", 0);
    getOrders();
  }, []);

  const getOrders=()=>{
    if(!token==undefined){
      nevigate("/Login");
      alert("please login")
      return ;
    }

      var role= CheckUser(token);
    
    const url = createURL(`api/Orders/AllOrders`);
    axios.get(url)
    .then((res)=>{
      
      setData(res.data);
      
      // assignUser();
    }
    )
  }

  const getData = (type, id) => {
    if(!token){
      nevigate("/Login");
      alert("please login")
      return 
    }
   
    const url = createURL(`api/Orders`);
    setAuthToken(sessionStorage.getItem("token"));
    axios
      .post(url)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          type === "Admin" ? setData(data.listOrders) : setItemData(data.listOrders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemDetail = (id) => {
    getData("UserItems",id);
    setShow(true);
  };

  const handleOrderStatusDetail = (orderNumber) => {
    setOrderNo(orderNumber);
    setShowOrderStatus(true);
  };

  const handleOrderStatus =(e) =>{
    e.preventDefault();
    const url = `${createURL}/api/Admin/updateOrderStatus`;
    const data = {  
      OrderNo: orderNo,
      OrderStatus: orderStatus
    };

    axios
      .post(url, data)
      .then((result) => {
        setShowOrderStatus(false);
        getData("Admin", 0);
        setOrderStatus("");        
        const dt = result.data;
        alert(dt.statusMessage);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return (
    <Fragment>
      <Header />
      <br></br>
      <div class="form-group col-md-12">
        <h3>All Orders</h3>
      </div>
      {data ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Order No</th>
              <th scope="col">Total</th>
              <th scope="col">Product Name</th>
              {/* <th scope="col">Order Date</th> */}
              <th scope="col">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.userId}</td>
                  <td onClick={() => handleItemDetail(val.id)}>
                    {val.orderId}
                  </td>
                  <td>{val.totalAmount}</td>
                  <td>{val.productName}</td>
                  {/* <td>{val.createdOn}</td> */}
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleOrderStatusDetail(val.orderNo)}>
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
      <div style={{ width: "100%" }}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Order Details for : ({itemData && itemData.length > 0 ? itemData[0]["orderNo"] : ""})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {itemData ? (
              <table className="table stripped table-hover mt-4">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>                   
                    <th scope="col">Equipment Name</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Order Date</th>
                    {/* <th scope="col">Image</th>                     */}
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((val, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{val.gearName}</td>
                        <td>{val.manufacturer}</td>
                        <td>{val.unitPrice}</td>
                        <td>{val.quantity}</td>
                        <td>{val.totalPrice}</td>
                        <td>{val.createdOn}</td>
                        {/* <td>
                          <img src={val.imageUrl} style={{ height:"10%" }} />
                        </td> */}
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              "No data found"
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div style={{ width: "100%" }}>
        <Modal show={showOrderStatus} onHide={handleCloseOrderStatus}>
          <Modal.Header>
            <Modal.Title>Update Order Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row">
              <div className="col-md-6">
                <label>
                  Select Status
                </label>
                <select
                  id="orderStatus"
                  className="form-control"                  
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}>
                  <option value="Cancel">Cancel</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="Primary" onClick={(e)=>handleOrderStatus(e)}>
              Update Status
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <AuthGuard/>
    </Fragment>
  );
}
