import React from "react";
import { Link, useParams } from "react-router-dom";
import "./post.css";
import { useGet } from "./useGet";
import GoogleMapsIcon from "./../images/googlemaps.svg";
import Loading from "./Loading";

function Product() {
  const { id } = useParams();
  const getPostUrl = "https://dollarfinder.herokuapp.com/posts";
  const { data, loading } = useGet(getPostUrl, "product");
  return (
    <main className="product-main">
      <Link to="/">
        <button className="product-back-link">Go Back</button>
      </Link>
      <div className="product-background">
        {loading ? (
          <div className="product-loading">
            <Loading />
          </div>
        ) : (
          <ProductData data={data.find((product) => product.id === id)} />
        )}
      </div>
    </main>
  );
}

const ProductData = ({ data }) => {
  const { img, title, price, location, posting_date } = data;
  return (
    <>
      <img
        src={"data:image/jpeg;base64," + img}
        alt={title}
        className="product-img"
      />
      <div className="product-info">
        <p className="product-title">{title}</p>
        <p className="product-price">
          <strong>Price: </strong> ${price}
        </p>

        <div className="product-location">
          <div>
            <strong>Location: </strong>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <div className="googlemaps-icon-background">
                <img src={GoogleMapsIcon} alt="" className="googlemaps-icon" />
              </div>
            </a>
          </div>
          <p>{location}</p>
        </div>

        <p className="product-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
          aspernatur optio vero nemo adipisci sunt amet ipsam nam nostrum
          officia!
        </p>
        <p className="product-date">Date of Post: {posting_date} 2021</p>
      </div>
    </>
  );
};

export default Product;
