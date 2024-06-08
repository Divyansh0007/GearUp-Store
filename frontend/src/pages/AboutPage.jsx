import React from 'react';
import { Footer, Navbar } from "../components";
import { NavLink } from 'react-router-dom';
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              className="img-fluid rounded"
              src="./assets/about.png"
              alt="About Our Store"
            />
          </div>
          <div className="col-md-6">
            <h1 className="display-4 mb-4">About Our Sports Store</h1>
            <p className="lead">
              Welcome to our premier sports equipment and accessories store! We are
              dedicated to providing our customers with the highest quality
              products and exceptional customer service. Our store is a one-stop
              shop for all your sporting needs, from the latest fitness gear to
              the most advanced athletic equipment.
            </p>
            <p>
              Our passion for sports and fitness is reflected in every aspect of
              our business. We carefully curate our inventory to ensure that
              we offer the best selection of top-of-the-line brands and
              innovative products. Whether you're an avid athlete, a weekend
              warrior, or just starting your fitness journey, we have
              everything you need to reach your goals.
            </p>
          <NavLink className="btn btn-primary btn-lg mt-3" to="/Product">  Shop Now</NavLink>
            {/* <a href="#" className="btn btn-primary btn-lg mt-3">
             
            </a> */}
          </div>
        </div>
      </div>
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Our Store?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="fas fa-3x mb-3"></i>
                  <h4 className="card-title">Premium Brands</h4>
                  <p className="card-text">
                    We partner with the best brands in the industry to
                    offer you the highest quality products.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="fas fa-shipping-fast fa-3x mb-3"></i>
                  <h4 className="card-title">Fast Shipping</h4>
                  <p className="card-text">
                    We offer fast and reliable shipping to ensure you
                    receive your order quickly.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="fas fa-headset fa-3x mb-3"></i>
                  <h4 className="card-title">Exceptional Support</h4>
                  <p className="card-text">
                    Our knowledgeable team is here to assist you with
                    any questions or concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
