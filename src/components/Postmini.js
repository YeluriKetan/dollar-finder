import React from "react";
import "./post.css";
import { Link } from "react-router-dom";

function Postmini(post) {
  const { id, img, title, price, location, date } = post;
  return (
    <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
      <div className="marketplace-post">
        <div className="postmini-info">
          <h4 className="postmini-location">{title.slice(0, 40)}</h4>
          <h4 className="postmini-date">${price}</h4>
        </div>
        <img src={img} alt={title} className="postmini-img" />
        <div className="postmini-info">
          <h4 className="postmini-title">{location.slice(0, 30)}</h4>
          <h4 className="postmini-price">{date}</h4>
        </div>
      </div>
    </Link>
  );
}

export default Postmini;
