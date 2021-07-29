import React from "react";
import "./createapost.css";
import axios from "axios";
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStylesCreateapost = makeStyles({
  formButton: {
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
      width: "5rem",
      height: "2rem",
      fontSize: "1rem",
    },
  },
});
function Createapost() {
  const [preview, setPreview] = React.useState();
  const [createpost, setCreatePost] = React.useState({
    title: "",
    price: "",
    location: "",
    locationUrl: "",
    description: "",
  });
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");
  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      createpost.title &&
      createpost.price &&
      createpost.location &&
      createpost.locationUrl &&
      createpost.description &&
      preview
    ) {
      const createpostUrl = "http://dollarfinder.herokuapp.com/posts";
      const loginToken = JSON.parse(
        localStorage.getItem("dollarfinderlogin")
      ).logintoken;

      axios
        .post(createpostUrl, createpost, {
          headers: { logintoken: loginToken },
        })
        .then(
          (response) => {
            const file = document.querySelector("input[type=file]").files[0];
            const formData = new FormData();
            formData.append("img", file);
            axios
              .post("https://" + response.data.route, formData, {
                headers: { logintoken: loginToken },
              })
              .then(
                (response) => {
                  setModalContent("Posted Successfully...");
                  setShowModal(true);
                  handleCancel();
                },
                (error) => {
                  setModalContent("Server Error. Please try again...");
                  setShowModal(true);
                }
              );
          },
          (error) => {
            setModalContent("Server Error. Please try again...");
            setShowModal(true);
          }
        );
    } else {
      if (
        createpost.title &&
        createpost.price &&
        createpost.location &&
        createpost.description &&
        preview
      ) {
        setModalContent("Please select location from dropdown menu");
        setShowModal(true);
      } else {
        setModalContent("Please fill in all the fields");
        setShowModal(true);
      }
    }
  };
  const handleCancel = () => {
    setCreatePost({
      title: "",
      price: "",
      location: "",
      locationUrl: "",
      description: "",
    });
    setPreview();
    const input = document.getElementById("create-location");
    input.value = "";
    const inputImg = document.getElementById("create-image");
    inputImg.value = "";
  };

  function previewFile(e) {
    e.preventDefault();
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        setPreview(reader.result);
      },
      setPreview()
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  let autocomplete;
  let place;
  function initAutocomplete() {
    const input = document.getElementById("create-location");
    autocomplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "sg" },
      fields: ["url", "name", "formatted_address"],
      types: ["establishment"],
    });
    autocomplete.addListener("place_changed", saveLocation);
  }
  function saveLocation() {
    place = autocomplete.getPlace();
    const input = document.getElementById("create-location");
    input.value = place.name + ", " + place.formatted_address;
    setCreatePost({
      ...createpost,
      location: place.name + ", " + place.formatted_address,
      locationUrl: place.url,
    });
  }
  return (
    <div className="create">
      {showModal && (
        <Modal
          closeModal={closeModal}
          modalContent={modalContent}
          classname={"create-modal"}
        />
      )}
      <h3 className="create-heading">New Post</h3>
      <form id="create-form-id" className="create-form" onSubmit={handleSubmit}>
        <div className="create-input-div">
          <label htmlFor="create-title" className="create-label">
            Name :
          </label>
          <input
            id="create-title"
            type="text"
            name="create-title"
            placeholder="Name"
            className="create-input"
            autoComplete="off"
            value={createpost.title}
            onChange={(e) =>
              setCreatePost({ ...createpost, title: e.target.value })
            }
          />
        </div>
        <div className="create-input-div">
          <label htmlFor="create-price" className="create-label">
            Price :
          </label>
          <input
            id="create-price"
            type="number"
            step="0.01"
            name="create-price"
            placeholder="Price in $"
            className="create-input"
            autoComplete="off"
            value={createpost.price}
            onChange={(e) =>
              setCreatePost({ ...createpost, price: e.target.value })
            }
          />
        </div>
        <div className="create-input-div">
          <label htmlFor="create-location" className="create-label">
            Location :
          </label>
          <input
            id="create-location"
            type="search"
            name="create-location"
            placeholder="Location of the store"
            className="create-input"
            value={createpost.location.name}
            onChange={(e) => {
              setCreatePost({ ...createpost, location: e.target.value });
              initAutocomplete();
            }}
          />
        </div>
        <div className="create-input-div">
          <label htmlFor="create-description" className="create-label">
            Description :
          </label>
          <textarea
            id="create-description"
            name="create-description"
            placeholder="Description"
            className="create-input create-input-textarea"
            cols="31"
            rows="5"
            autoComplete="off"
            value={createpost.description}
            onChange={(e) =>
              setCreatePost({ ...createpost, description: e.target.value })
            }
          />
        </div>
        <div className="create-input-div create-input-div-img">
          <label htmlFor="create-img" className="create-label">
            Image :
          </label>
          <input
            id="create-image"
            type="file"
            name="create-img"
            accept="image/*"
            className="create-input"
            onChange={(e) => {
              previewFile(e);
            }}
          />

          {preview && (
            <img
              src={preview}
              height="100"
              alt=""
              className="create-preview-img"
            />
          )}
        </div>
        <div className="create-buttons">
          <Button
            variant="contained"
            type="submit"
            className={useStylesCreateapost().formButton}
          >
            Post
          </Button>
          <Button
            variant="contained"
            onClick={handleCancel}
            type="button"
            className={useStylesCreateapost().formButton}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Createapost;
