import React from "react";
import "./post.css";
import { Link } from "react-router-dom";

const Postmini = (post) => {
  const { id, img, title, price, date } = post;
  return (
    <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
      <div className="marketplace-post">
        <div className="postmini-info">
          <h4 className="postmini-location">{title.slice(0, 40)}</h4>
          <h4 className="postmini-price">${price}</h4>
        </div>
        <img
          src={"data:image/jpeg;base64," + img}
          alt={title}
          className="postmini-img"
        />
        <div className="postmini-info">
          <h4 className="postmini-title">{1234}</h4>
          <h4 className="postmini-date">
            {date.slice(0, 10).split("-").reverse().join("-")}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default Postmini;
