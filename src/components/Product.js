import React from "react";
import { Link, useParams } from "react-router-dom";
import { data } from "./data";
import "./post.css";

function Product() {
  const { id } = useParams();
  const { img, title, price } = data.find(
    (product) => product.id === parseInt(id)
  );
  return (
    <main className="product-main">
      <div className="product-background">
        <img src={img} alt={title} className="product-img" />
        <div className="product-info">
          <p className="product-title">{title}</p>
          <p className="product-price">${price}</p>
          <p className="product-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
            sit! Eaque non ipsum corporis, sit, placeat dolorem sapiente ut
            doloremque illo accusantium harum alias, veritatis totam?
            Consequatur, assumenda nesciunt veritatis incidunt adipisci
            reiciendis? Veritatis, eum magni. Eos nostrum corrupti aspernatur
            culpa delectus? Sit quia dolorem repellat rerum distinctio
            dignissimos unde?
          </p>
        </div>
      </div>
      <Link to="/">Home</Link>
    </main>
  );
}

export default Product;
