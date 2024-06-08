import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./Admin/AdminHeader";
import { createURL } from "./constant";
import { useNavigate } from "react-router-dom";
import AuthGuard from './AuthGuard';
 
export default function Gear() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [gearId, setgearId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [addUpdateFlag, setAddUpdateFlag] = useState(true);
  const nevigate=useNavigate();

 
  useEffect(() => {
    getData();
    getAllCategory();
  }, []);
 

  const getData = () => {
    const url=createURL('api/Products');
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          console.log(result.data);
          setProduct(result.data);
        }
      })
      .catch((error) => {
        console.log("error"+error);
      });
  };
 
  const deletegear = (e, id) => {
    e.preventDefault();
    const url = createURL(`api/Products/${id}`);
    axios
      .delete(url, data)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          getData();
          alert("product deleted successfully");
        }
      })
  };
 
  const editgear = (e, id) => {
    e.preventDefault();
    setAddUpdateFlag(false);
    const url = createURL(`api/Products/${id}`);
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        console.log(data);
        setgearId(id);
        setName(data.productName);
        setDescription(data.productDescription);
        setUnitPrice(data.price);
        setStock(data.stock);
        setImageUrl(data.imageURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  const getAllCategory = () => {
    const url = createURL('api/Categories');
    axios
      .get(url)
      .then((response) => {
        setCategory(response.data);
        console.log(response.data);
      })
  }
  
  const addProduct = () => {
    const data = {
      productName: name,
      productDescription: description,
      price: unitPrice,
      stock: stock,
      imageURL: imageUrl,
      categoryId: categoryId,
    };
    const url = createURL('api/Products');
    axios
      .post(url, data)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          alert("gear added successfully!");
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  const updategear = () => {
    const data = {
      productId:gearId,
      productName: name,
      productDescription: description,
      price: unitPrice,
      stock: stock,
      imageURL: imageUrl,
      categoryId: categoryId,
    };
    const url = createURL(`api/Products/${gearId}`);
    axios
      .put(url, data)
      .then((result) => {
        console.log(result);
        const dt = result.data;
        console.log(dt);
        if (result.status === 200) {
          alert("data updated successfully");
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  return (
    <Fragment>
      <AdminHeader />
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ width: "80%", textAlign: "center" }}
        >
          <h3>Add new products</h3>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="form-control highlighted"
            style={{ marginBottom: "10px" }}
            required
            value={name}
          />
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="form-control highlighted"
            style={{ marginBottom: "10px" }}
            required
            value={description}
          />
          <input
            type="text"
            className="form-control highlighted"
            id="validationTextarea"
            placeholder="UnitPrice"
            onChange={(e) => setUnitPrice(e.target.value)}
            style={{ marginBottom: "10px" }}
            required
            value={unitPrice}
          />
          <input
            type="text"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            className="form-control highlighted"
            style={{ marginBottom: "10px" }}
            required
            value={stock}
          />
          <input
            type="link"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image Url"
            className="form-control highlighted"
            style={{ marginBottom: "10px" }}
            required
            value={imageUrl}
          />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ marginBottom: "10px" }}>
            <option value="">Select a category</option>
            {category.map((cat, index) => (
              <option key={index} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          <div style={{ marginTop: "20px" }}>
            {addUpdateFlag ? (
              <button
                className="btn btn-primary"
                style={{ width: "150px" }}
                onClick={addProduct}
              >
                Add
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: "150px" }}
                onClick={updategear}
              >
                Update
              </button>
            )}
            <button
              className="btn btn-danger"
              style={{ width: "150px", marginLeft: "10px" }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {product ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">UnitPrice</th>
              <th scope="col">Stock</th>
              <th scope="col">Image</th>
              <th scope="col" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((val, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{val.productName}</td>
                  <td>{val.productDescription}</td>
                  <td>{val.price}</td>
                  <td>{val.stock}</td>
                  <td>
                    <img
                      src={val.imageURL}
                      style={{ width: "70px", borderRadius: "11px" }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={(e) => editgear(e, val.productId)}
                    >
                      Edit
                    </button>{" "}
                  </td>
                  <td>
                    <button
                      onClick={(e) => deletegear(e, val.productId)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
      <AuthGuard/>
    </Fragment>
  );
}
