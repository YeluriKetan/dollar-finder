import React from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { useGetHeader } from "./useGet";
import GoogleMapsIcon from "./../images/googlemaps.svg";
import Loading from "./Loading";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
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
  const initialLoginState = () => {
    if (!localStorage.hasOwnProperty("dollarfinderlogin")) {
      return false;
    } else {
      return JSON.parse(localStorage.getItem("dollarfinderlogin")).loginState;
    }
  };
  const loginState = initialLoginState();
  const getPostUrl = `https://dollarfinder.herokuapp.com/posts/${id}`;
  const { data, loading } = useGetHeader(getPostUrl, "product");
  // const [newComment, setNewComment] = React.useState("");
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
      loginState={loginState}
      // newComment={newComment}
      // setNewComment={setNewComment}
      // handleNewComment={handleNewComment}
    />
  );
};

const ProductData = ({
  data,
  loginState,
  // newComment,
  // setNewComment,
  // handleNewComment,
}) => {
  const { id, img, title, price, location, locationUrl, date } = data.post;
  const [voteValue, setVoteValue] = React.useState(0);
  const [voteCount, setVoteCount] = React.useState(0);
  const [disableVote, setDisableVote] = React.useState(!loginState);
  const votePostUrl = "https://dollarfinder.herokuapp.com/posts/vote";
  const handleUpvote = () => {
    const loginToken = JSON.parse(
      localStorage.getItem("dollarfinderlogin")
    ).logintoken;
    switch (voteCount) {
      case -1:
        axios
          .put(
            votePostUrl,
            { vote: 1, postId: id },
            {
              headers: {
                logintoken: loginToken,
              },
            }
          )
          .then(
            (response) => {
              setVoteCount(1);
              setVoteValue(voteValue + 2);
              setDisableVote(true);
            },
            (error) => {}
          );
        break;
      case 0:
        axios
          .put(
            votePostUrl,
            { vote: 1, postId: id },
            {
              headers: {
                logintoken: loginToken,
              },
            }
          )
          .then(
            (response) => {
              setVoteCount(1);
              setVoteValue(voteValue + 1);
              setDisableVote(true);
            },
            (error) => {}
          );
        break;
      case 1:
        axios
          .put(
            votePostUrl,
            { vote: 0, postId: id },
            {
              headers: {
                logintoken: loginToken,
              },
            }
          )
          .then(
            (response) => {
              setVoteCount(0);
              setVoteValue(voteValue - 1);
              setDisableVote(true);
            },
            (error) => {}
          );
        break;
      default:
        break;
    }
  };
  const handleDownvote = () => {
    const loginToken = JSON.parse(
      localStorage.getItem("dollarfinderlogin")
    ).logintoken;
    switch (voteCount) {
      case -1:
        axios
          .put(
            votePostUrl,
            { vote: 0, postId: id },
            {
              headers: {
                logintoken: loginToken,
              },
            }
          )
          .then(
            (response) => {
              setVoteCount(0);
              setVoteValue(voteValue + 1);
              setDisableVote(true);
            },
            (error) => {}
          );
        break;
      case 0:
        axios
          .put(
            votePostUrl,
            { vote: -1, postId: id },
            {
              headers: {
                logintoken: loginToken,
              },
            }
          )
          .then(
            (response) => {
              setVoteCount(-1);
              setVoteValue(voteValue - 1);
              setDisableVote(true);
            },
            (error) => {}
          );
        break;
      case 1:
        axios
          .put(
            votePostUrl,
            { vote: -1, postId: id },
            {
              headers: {
                logintoken: loginToken,
              },
            }
          )
          .then(
            (response) => {
              setVoteCount(-1);
              setVoteValue(voteValue - 2);
              setDisableVote(true);
            },
            (error) => {}
          );
        break;
      default:
        break;
    }
  };
  React.useEffect(() => {
    setVoteValue(data.totalVote);
    setVoteCount(data.vote);
    // eslint-disable-next-line
  }, []);
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
            disabled={disableVote}
          />
          <p className="product-vote-count">{voteValue}</p>
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
            disabled={disableVote}
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
