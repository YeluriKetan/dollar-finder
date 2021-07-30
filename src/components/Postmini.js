import React from "react";
import "./postmini.css";
import { ProductInfo } from "./Product";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import axios from "axios";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  dialog: {
    width: "fit-content",
    height: "fit-content",
    borderRadius: "2rem",
    maxHeight: "none",
    position: "relative",
    margin: 0,
    maxWidth: "none !important",
    backgroundColor: "transparent",
  },
  dialogIcon: {
    height: "2rem",
    width: "2rem",
    color: "black",
  },
  deletePostDialog: {
    width: "30rem",
    height: "18rem",
    borderRadius: "1rem",
    backgroundColor: "#e7efc5",
  },
  deletePostDialogButton: {
    width: "10rem",
    height: "3rem",
    borderRadius: "1.5rem",
    fontFamily: "Teko",
    fontSize: "1.5rem",
    textTransform: "none",
    backgroundColor: "#413c58",
    color: "white",
    "&:hover": {
      backgroundColor: "#665e8a",
    },
    "@media (max-width: 600px)": {
      width: "7rem",
      height: "2rem",
      fontSize: "1rem",
      margin: "0.5rem",
    },
  },
});
const Postmini = (post) => {
  const { id, img, title, location, price, date, yourPost } = post;
  const [openPostDialog, setOpenPostDialog] = React.useState(false);
  let handleOpenPostDialog = () => {
    setOpenPostDialog(true);
  };
  const handleClosePostDialog = () => {
    setOpenPostDialog(false);
  };
  const [openDeletePost, setOpenDeletePost] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const handleOpenDeletePost = () => {
    setOpenDeletePost(true);
  };
  const handleCloseDeletePost = () => {
    setOpenDeletePost(false);
  };
  const handleDeletePost = () => {
    const deletePostUrl = `https://dollarfinder.herokuapp.com/posts/${id}`;
    const loginToken = JSON.parse(
      localStorage.getItem("dollarfinderlogin")
    ).logintoken;
    axios
      .delete(deletePostUrl, {
        headers: {
          logintoken: loginToken,
        },
      })
      .then(
        (response) => {
          console.log(response);
          handleCloseDeletePost();
          handleClosePostDialog();
          setDeleted(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <>
      <div
        className="marketplace-post"
        onClick={deleted ? () => {} : handleOpenPostDialog}
      >
        <div className="postmini-info">
          <h4 className="postmini-title">{title.slice(0, 25) + "..."}</h4>
          <h4 className="postmini-price">${price}</h4>
        </div>
        <img src={img} alt={title} className="postmini-img" />
        <div className="postmini-info">
          <h4 className="postmini-location">{location.slice(0, 25) + "..."}</h4>
          <h4 className="postmini-date">
            {date.slice(0, 10).split("-").reverse().join("-")}
          </h4>
        </div>
      </div>
      <Dialog
        open={openPostDialog}
        onClose={handleClosePostDialog}
        aria-labelledby="form-dialog-title"
        classes={{ paper: useStyles().dialog }}
        scroll="body"
      >
        <div className="post-dialog-icon-div">
          <a
            href={`/product/${id}`}
            target="_blank"
            rel="noreferrer"
            className="share-post-dialog-icon"
          >
            <ShareOutlinedIcon className={useStyles().dialogIcon} />
          </a>

          <div
            onClick={handleOpenDeletePost}
            className="delete-post-dialog-icon"
            style={yourPost ? {} : { visibility: "hidden" }}
          >
            <DeleteOutlinedIcon className={useStyles().dialogIcon} />
          </div>
          <div
            onClick={handleClosePostDialog}
            className="close-post-dialog-icon"
          >
            <CloseOutlinedIcon className={useStyles().dialogIcon} />
          </div>
        </div>
        <ProductInfo id={id} />
        <Dialog
          open={openDeletePost}
          onClose={handleCloseDeletePost}
          aria-labelledby="form-dialog-title"
          classes={{ paper: useStyles().deletePostDialog }}
        >
          <div className="dialog-delete">
            <h3>Delete Post?</h3>
            <p>
              Deleting this post permanently deletes all its related data such
              as info, image and votes.
            </p>
            <p>
              Are you sure you want to <strong>DELETE </strong>
              your post?
            </p>
            <div className="dialog-delete-buttons">
              <Button
                type="button"
                variant="contained"
                className={useStyles().deletePostDialogButton}
                onClick={handleDeletePost}
              >
                Confirm Delete
              </Button>
              <Button
                type="button"
                variant="contained"
                className={useStyles().deletePostDialogButton}
                onClick={handleCloseDeletePost}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      </Dialog>
    </>
  );
};

export default Postmini;
