
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Footer, Navbar } from "../components"  //Product
import { createURL } from './constant';
import {  NavLink } from 'react-router-dom'; //Link,

// CSS styles for maintaining image aspect ratio
import './Product.css';

const Products = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [showSearchError, setShowSearchError] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    const url = createURL('api/Products');
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setFilteredProducts(res.data);
      })
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.value.trim();
    setSearchTerm(searchValue);
    if (searchValue === '') {
      setShowSearchError(true);
      setNoProductsFound(false);
      setFilteredProducts([]);
    } else {
      setShowSearchError(false);
      const newFilteredProducts = product.filter((prod) => {
        return prod.productName.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredProducts(newFilteredProducts);
      if (newFilteredProducts.length === 0) {
        setNoProductsFound(true);
      } else {
        setNoProductsFound(false);
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className='container' style={{paddingBottom: '100px'}}>
        <form onSubmit={(e) => e.preventDefault()} className='my-4 d-flex justify-content-center'>
          <div className="input-group" style={{ width: '40%' }}>
            <input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={handleSearch}
              className='form-control'
            />
            <div className="input-group-append ml-2">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
          {showSearchError && (
            <div className="alert alert-warning mt-3">
              Please enter a search term to find products.
            </div>
          )}
        </form>
        {noProductsFound ? (
          <div className="alert alert-warning">
            No products found for the search term "{searchTerm}"
          </div>
        ) : (
          <div className='row row-cols-3 g-4'>
            {filteredProducts.map((prod) => {
              return (
                <div key={prod.productId} className="col">
                  <div className="products card h-100">
                    <img src={prod.imageURL} className="prod-img card-img-top" alt={prod.productName} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{prod.productName}</h5>
                      <p className="card-text">{prod.productDescription.slice(0, 50)}</p>
                      <NavLink to={`/productview/${prod.productId}`} className="btn btn-primary">View</NavLink>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Products;
