import React from "react";
import "./createapost.css";
import axios from "axios";
import Modal from "./Modal";

function Createapost() {
  const [preview, setPreview] = React.useState();
  const [createpost, setCreatePost] = React.useState({
    title: "",
    price: "",
    location: "",
    description: "",
    img: "",
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
      createpost.description &&
      createpost.img
    ) {
      const newPost = {
        ...createpost,
        img: preview,
        logintoken: JSON.parse(localStorage.getItem("dollarfinderlogin"))
          .logintoken,
      };
      console.log(newPost);
      axios.post("http://dollarfinder.herokuapp.com/posts", newPost).then(
        (response) => {
          console.log(response);
          setModalContent("Posted Successfully...");
          setShowModal(true);
          handleCancel();
        },
        (error) => {
          setModalContent("Server Error. Please try again...");
          setShowModal(true);
        }
      );
    } else {
      setModalContent("Please fill in all the fields");
      setShowModal(true);
    }
  };
  const handleCancel = () => {
    setCreatePost({
      title: "",
      price: "",
      location: "",
      description: "",
      img: "",
    });
    setPreview();
  };
  function previewFile() {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        setPreview(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
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
            type="text"
            name="create-location"
            placeholder="Location of the store"
            className="create-input"
            autoComplete="off"
            value={createpost.location}
            onChange={(e) =>
              setCreatePost({ ...createpost, location: e.target.value })
            }
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
            cols="50"
            rows="4"
            autoComplete="off"
            value={createpost.description}
            onChange={(e) =>
              setCreatePost({ ...createpost, description: e.target.value })
            }
          />
        </div>
        <div className="create-input-div">
          <label htmlFor="create-img" className="create-label">
            Image :
          </label>
          <input
            id="create-img"
            type="file"
            name="create-img"
            accept="image/*"
            className="create-input"
            value={createpost.img}
            onChange={(e) => {
              previewFile();
              setCreatePost({ ...createpost, img: e.target.value });
            }}
          />
          <img
            src={preview}
            height="100"
            alt=""
            className="create-preview-image"
          />
        </div>

        <div className="create-buttons">
          <button type="submit" className="form-submit">
            Post
          </button>
          <button type="button" className="form-submit" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Createapost;
