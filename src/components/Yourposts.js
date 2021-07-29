import React from "react";
import "./yourposts.css";
import { useGetHeader } from "./useGet";
import Loading from "./Loading";
import Postmini from "./Postmini";

function Yourposts() {
  const getYourpostsUrl = "https://dollarfinder.herokuapp.com/account/posts";
  const { data, loading } = useGetHeader(getYourpostsUrl, "yourposts-market");
  return (
    <div className="yourposts-container">
      <h3 className="yourposts-heading">Your Posts</h3>
      {loading ? (
        <div className="yourposts-loading">
          <Loading color={"black"} />
        </div>
      ) : (
        <div className="yourposts">
          <div className="yourposts-marketplace">
            {data
              .filter(
                (obj) =>
                  obj.hasOwnProperty("id") &&
                  obj.hasOwnProperty("title") &&
                  obj.hasOwnProperty("price") &&
                  obj.hasOwnProperty("location") &&
                  obj.hasOwnProperty("date")
              )
              .map((obj) => {
                return <Postmini key={obj.id} {...obj} yourPost={true} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Yourposts;
