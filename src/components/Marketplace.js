import React from "react";
import Postmini from "./Postmini";
import "./marketplace.css";
import { data } from "./data";

function MarketPlace() {
  const [sortMethod, setSortMethod] = React.useState(0);

  const handleSelectChange = (event) => {
    setSortMethod(event.target.value);
  };
  console.log(sortMethod);
  return (
    <div className="marketplace-background">
      <form action="" className="marketplace-sortby-form">
        <label htmlFor="">Sort by : </label>
        <select name="" id="" onChange={handleSelectChange}>
          <option value={0}>Price: Low - High</option>
          <option value={1}>Price: High - Low</option>
          <option value={2}>Location: Near - Far</option>
          <option value={3}>Location: Far - Near</option>
        </select>
      </form>

      <div className="posts-background">
        {data.map((obj) => {
          return <Postmini {...obj} />;
        })}
      </div>
    </div>
  );
}

export default MarketPlace;
