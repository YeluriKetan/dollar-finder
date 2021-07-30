import React, { useState } from "react";
import "./advanced.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Modal from "./Modal";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles({
  formTextField: {
    fontFamily: '"Overpass Mono", "monospace"',
    fontSize: "1.25rem",
    width: "18.2rem",
    height: "2.7rem",
    [`& fieldset`]: {
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "black",
    },
    "& input": {
      textAlign: "center",
    },
    "@media (max-width: 600px)": {
      fontSize: "0.8rem",
      width: "12rem",
      height: "2rem",
    },
  },
  dialogDelete: {
    width: "30rem",
    height: "18rem",
    borderRadius: "1rem",
    backgroundColor: "#e7efc5",
  },
  advancedButton: {
    width: "12rem",
    height: "3rem",
    borderRadius: "1.5rem",
    fontFamily: "Teko",
    fontSize: "1.5rem",
    textTransform: "none",
    backgroundColor: "#413c58",
    color: "white",
    padding: 0,
    "&:hover": {
      backgroundColor: "#665e8a",
    },
    "@media (max-width: 600px)": {
      width: "8rem",
      height: "2rem",
      fontSize: "1rem",
    },
  },
  advancedDeleteButton: {
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

function Advanced() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [changepwModal, setChangepwModal] = useState({
    showModal: false,
    modalContent: "",
  });
  const closeChangepwModal = () => {
    setChangepwModal({ ...changepwModal, showModal: false });
  };
  function handleChangePassword(e) {
    e.preventDefault();
    if (password1 && password2) {
      if (password1 === password2) {
        const changepwUrl = "https://dollarfinder.herokuapp.com/account/change";
        const loginToken = JSON.parse(
          localStorage.getItem("dollarfinderlogin")
        ).logintoken;
        const payload = { password: password1 };
        axios
          .put(changepwUrl, payload, {
            headers: { logintoken: loginToken },
          })
          .then(
            (response) => {
              setChangepwModal({
                showModal: true,
                modalContent: "Password Change successful.",
              });
              setPassword1("");
              setPassword2("");
            },
            (error) => {
              setChangepwModal({
                showModal: true,
                modalContent: "Server error. Try again.",
              });
              setPassword1("");
              setPassword2("");
            }
          );
      } else {
        setChangepwModal({
          showModal: true,
          modalContent: "The passwords do not match. Try again.",
        });
      }
    } else {
      setChangepwModal({
        showModal: true,
        modalContent: "Please fill in all the fields",
      });
    }
  }
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteAcct = () => {
    console.log("Delete Acct");
  };
  return (
    <div className="advanced-container">
      <h3 className="advanced-heading">Advanced</h3>
      <div className="advanced">
        <form
          className="advanced-changepw-form"
          onSubmit={handleChangePassword}
        >
          {changepwModal.showModal && (
            <Modal
              closeModal={closeChangepwModal}
              modalContent={changepwModal.modalContent}
              classname={"changepw-modal"}
            />
          )}
          <h4 className="advanced-changepw-heading">Change Password</h4>
          <TextField
            type="password"
            name="password1"
            placeholder="New Password"
            autoComplete="off"
            variant="outlined"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            InputProps={{
              classes: {
                root: useStyles().formTextField,
              },
            }}
          />
          <TextField
            type="password"
            name="password2"
            placeholder="Confirm New Password"
            autoComplete="off"
            variant="outlined"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            InputProps={{
              classes: {
                root: useStyles().formTextField,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            className={useStyles().advancedButton}
          >
            Change Password
          </Button>
        </form>
        <div class="advanced-divider"></div>
        <div className="advanced-del-acct">
          <Button
            type="button"
            variant="contained"
            disabled
            className={useStyles().advancedButton}
            onClick={handleClickOpenDelete}
          >
            Delete Account
          </Button>
        </div>
      </div>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="form-dialog-title"
        classes={{ paper: useStyles().dialogDelete }}
      >
        <div className="dialog-delete">
          <h3>Delete Account?</h3>
          <p>
            Deleting your account deletes all your data such as posts, likes and
            reward progress.
          </p>
          <p>
            Are you sure you want to <strong>DELETE </strong>
            your account?
          </p>
          <div className="dialog-delete-buttons">
            <Button
              type="button"
              variant="contained"
              className={useStyles().advancedDeleteButton}
              onClick={handleDeleteAcct}
            >
              Confirm Delete
            </Button>
            <Button
              type="button"
              variant="contained"
              className={useStyles().advancedDeleteButton}
              onClick={handleCloseDelete}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Advanced;
