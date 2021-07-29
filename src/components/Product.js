import React from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { useGet } from "./useGet";
import GoogleMapsIcon from "./../images/googlemaps.svg";
import Loading from "./Loading";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import Button from "@material-ui/core/Button";
// import AddCommentIcon from "@material-ui/icons/AddComment";

function Product() {
  const { id } = useParams();
  return (
    <main className="product-main">
      <div className="product-page-background">
        <ProductInfo id={id} />
      </div>
    </main>
  );
}

const useStylesProduct = makeStyles({
  voteCheckbox: {
    width: "5rem",
    height: "5rem",
    margin: "0rem",
    padding: "0rem",
    "@media (max-width: 600px)": {
      width: "4rem",
      height: "4rem",
    },
  },
  upvote: {
    width: "3rem",
    height: "3rem",
    color: "#768948",
    cursor: "pointer",
    "@media (max-width: 600px)": {
      width: "2rem",
      height: "2rem",
    },
  },
  downvote: {
    width: "3rem",
    height: "3rem",
    color: "#d83131",
    cursor: "pointer",
    "@media (max-width: 600px)": {
      width: "2rem",
      height: "2rem",
    },
  },
  commentTextfield: {
    width: "30rem",
    height: "fit-content",
    borderRadius: "1rem",
    fontSize: "1rem",
    fontFamily: '"Overpass Mono", "monospace"',
    border: "solid black",
    borderWidth: "1px",
    padding: "0.2rem 0.5rem",
    margin: "0 0 0 1rem",
    "&:focus": {
      outline: "none",
    },
  },
  productDialogButton: {
    width: "4rem",
    height: "2rem",
    borderRadius: "0.5rem",
    fontFamily: "Teko",
    fontSize: "1.5rem",
    textTransform: "none",
    backgroundColor: "#413c58",
    color: "white",
    margin: "0 1rem",
    "&:hover": {
      backgroundColor: "#665e8a",
    },
    "@media (max-width: 600px)": {
      width: "2rem",
      height: "2rem",
      fontSize: "1rem",
    },
  },
});
export const ProductInfo = ({ id }) => {
  const getPostUrl = `https://dollarfinder.herokuapp.com/posts/${id}`;
  const { data, loading } = useGet(getPostUrl, "product");
  const [voteCount, setVoteCount] = React.useState(0);
  // const [newComment, setNewComment] = React.useState("");
  const handleUpvote = () => {
    if (voteCount === 1) {
      setVoteCount(0);
    } else {
      setVoteCount(1);
    }
  };
  const handleDownvote = () => {
    if (voteCount === -1) {
      setVoteCount(0);
    } else {
      setVoteCount(-1);
    }
  };
  // const handleNewComment = (e) => {
  //   e.preventDefault();
  //   setNewComment("");
  // };
  return loading ? (
    <div className="product-background">
      <div className="product-loading">
        <Loading />
      </div>
    </div>
  ) : (
    <ProductData
      data={data}
      handleUpvote={handleUpvote}
      handleDownvote={handleDownvote}
      voteCount={voteCount}
      // newComment={newComment}
      // setNewComment={setNewComment}
      // handleNewComment={handleNewComment}
    />
  );
};

const ProductData = ({
  data,
  handleUpvote,
  handleDownvote,
  voteCount,
  // newComment,
  // setNewComment,
  // handleNewComment,
}) => {
  const { img, title, price, location, locationUrl, date } = data;

  return (
    <div className="product-background">
      <div className="product-container">
        <img src={img} alt={title} className="product-img" />
        <div className="product-info">
          <p className="product-title">{title}</p>
          <p className="product-price">
            <strong>Price: </strong> ${price}
          </p>

          <div className="product-location">
            <div>
              <strong>Location: </strong>
              <a href={locationUrl} target="_blank" rel="noreferrer">
                <div className="googlemaps-icon-background">
                  <img
                    src={GoogleMapsIcon}
                    alt=""
                    className="googlemaps-icon"
                  />
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
          <p className="product-date">
            Date of Post: {date.slice(0, 10).split("-").reverse().join("-")}
          </p>
        </div>
      </div>
      <div className="product-review">
        <div className="product-votebox">
          <Checkbox
            icon={
              <ThumbUpAltOutlinedIcon className={useStylesProduct().upvote} />
            }
            checkedIcon={
              <ThumbUpAltIcon className={useStylesProduct().upvote} />
            }
            className={useStylesProduct().voteCheckbox}
            onClick={handleUpvote}
            checked={voteCount === 1}
          />
          <p className="product-vote-count">{voteCount}</p>
          <Checkbox
            icon={
              <ThumbDownOutlinedIcon className={useStylesProduct().downvote} />
            }
            checkedIcon={
              <ThumbDownIcon className={useStylesProduct().downvote} />
            }
            className={useStylesProduct().voteCheckbox}
            onClick={handleDownvote}
            checked={voteCount === -1}
          />
        </div>
        {/* <h4 className="product-commentbox-heading">Comments</h4>
        <div className="product-commentbox-content">
          <form
            className="product-commentbox-newcomment"
            onSubmit={handleNewComment}
          >
            <TextareaAutosize
              type="text"
              name="loginusername"
              placeholder="New Comment"
              autoComplete="off"
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={useStylesProduct().commentTextfield}
              maxLength="100"
            />
            <Button
              variant="contained"
              type="submit"
              className={useStylesProduct().productDialogButton}
            >
              <AddCommentIcon />
            </Button>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default Product;
