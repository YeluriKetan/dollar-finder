import React from "react";
import { Link, useParams } from "react-router-dom";
import { data } from "./data";
import "./post.css";

function Product() {
  const { id } = useParams();
  const { img, title, price, location, date } = data.find(
    (product) => product.id === parseInt(id)
  );
  return (
    <main className="product-main">
      <Link to="/">
        <button className="product-back-link">Go Back</button>
      </Link>
      <div className="product-background">
        <img src={img} alt={title} className="product-img" />
        <div className="product-info">
          <p className="product-title">{title}</p>
          <p className="product-price">
            <strong>Price:</strong> ${price}
          </p>
          <p className="product-location">
            <strong>Location:</strong> {location}
          </p>

          <p className="product-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
            aspernatur optio vero nemo adipisci sunt amet ipsam nam nostrum
            officia!
          </p>
          <p className="product-date">Date of Post: {date} 2021</p>
        </div>
      </div>
    </main>
  );
}

export default Product;
