import React from "react";
import { Link, useParams } from "react-router-dom";
import "./post.css";
import { useFetch } from "./useFetch";

function Product() {
  const { id } = useParams();
  const getPostUrl = "https://dollarfinder.herokuapp.com/posts";
  const { data, loading } = useFetch(getPostUrl, "product");
  return (
    <main className="product-main">
      {loading ? (
        <p>Loading</p>
      ) : (
        <ProductData data={data.find((product) => product.id === id)} />
      )}
    </main>
  );
}

const ProductData = ({ data }) => {
  const { img, title, price, location, posting_date } = data;
  return (
    <>
      <Link to="/">
        <button className="product-back-link">Go Back</button>
      </Link>
      <div className="product-background">
        <img
          src={"data:image/jpeg;base64," + img}
          alt={title}
          className="product-img"
        />
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
          <p className="product-date">Date of Post: {posting_date} 2021</p>
        </div>
      </div>
    </>
  );
};

export default Product;
