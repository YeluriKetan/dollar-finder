import React, { useState } from "react";
import "./login.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import Modal from "./Modal";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import Button from "@material-ui/core/Button";

function Login({ setLogin }) {
  const [modal, setModal] = useState({ showModal: false, modalContent: "" });
  const closeModal = () => {
    setModal({ ...modal, showModal: false });
  };
  const [formSelect, setFormSelect] = useState(0);
  let form = () => {
    if (formSelect) {
      return <RegisterForm modal={modal} setModal={setModal} />;
    } else {
      return <LoginForm setLogin={setLogin} setModal={setModal} />;
    }
  };
  return (
    <main className="login-main">
      <div className="login-register-container">
        <Selector
          style={{
            margin: 0,
            padding: 0,
            height: "fit-content",
            width: "fit-content",
          }}
          formSelect={formSelect}
          changeFormValue={setFormSelect}
        />
        <div className="forms-container">{form()}</div>
        {modal.showModal && (
          <Modal
            closeModal={closeModal}
            modalContent={modal.modalContent}
            classname={"login-modal"}
          />
        )}
      </div>
    </main>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

const useStyles = makeStyles({
  tab: {
    textTransform: "none",
    fontFamily: "Teko",
    fontSize: "2rem",
  },
  dialog: {
    width: "30rem",
    height: "18rem",
    borderRadius: "1rem",
    backgroundColor: "#e7efc5",
  },
  textField: {
    fontFamily: "Overpass Mono",
    [`& fieldset`]: {
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "black",
    },
  },
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
      fontSize: "1rem",
      width: "12rem",
      height: "2rem",
    },
  },
  loginFormButton: {
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
      width: "6rem",
      height: "2rem",
      fontSize: "1rem",
    },
  },
  forgotDialogButton: {
    width: "7rem",
    height: "2rem",
    borderRadius: "1rem",
    fontFamily: "Teko",
    fontSize: "1.2rem",
    textTransform: "none",
    backgroundColor: "#413c58",
    color: "white",
    "&:hover": {
      backgroundColor: "#665e8a",
    },
  },
});
function Selector({ formSelect, changeFormValue }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Tabs
          value={formSelect}
          indicatorColor="primary"
          onChange={(event, newValue) => changeFormValue(newValue)}
        >
          <Tab label="Login" className={useStyles().tab} />
          <Tab label="Sign Up" className={useStyles().tab} />
        </Tabs>
      </ThemeProvider>
    </>
  );
}
function LoginForm({ setLogin, setModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const oldUser = {
        username: username,
        password: password,
      };
      const loginUrl = "https://dollarfinder.herokuapp.com/login";
      axios.post(loginUrl, oldUser).then(
        (response) => {
          const storeLogin = {
            logintoken: response.data,
            loginState: true,
          };
          localStorage.setItem("dollarfinderlogin", JSON.stringify(storeLogin));
          setLogin(true);
        },
        (error) => {
          setModal({
            showModal: true,
            modalContent: "Incorrect username or password",
          });
        }
      );
    } else {
      setModal({
        showModal: true,
        modalContent: "Please fill in all the fields",
      });
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <form
        id="login-form-id"
        className="form login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          name="loginusername"
          placeholder="Username"
          autoComplete="off"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            classes: {
              root: useStyles().formTextField,
            },
          }}
        />
        <TextField
          type="password"
          name="loginpassword"
          placeholder="Password"
          autoComplete="off"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            classes: {
              root: useStyles().formTextField,
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          className={useStyles().loginFormButton}
        >
          Login
        </Button>
        <p
          id="forgot-password-id"
          className="forgot-password"
          onClick={handleClickOpen}
        >
          Forgot password?
        </p>
      </form>
      <ForgotPassword open={open} setOpen={setOpen} />
    </>
  );
}

function ForgotPassword({ open, setOpen }) {
  const [forgotModal, setForgotModal] = useState({
    showModal: false,
    modalContent: "",
  });
  const closeForgotModal = () => {
    setForgotModal({ ...forgotModal, showModal: false });
  };
  const [forgotEmail, setForgotEmail] = React.useState("");
  const handleClose = () => {
    setOpen(false);
    setForgotEmail("");
  };
  const submitForgot = (e) => {
    e.preventDefault();
    const postForgotUrl = "https://dollarfinder.herokuapp.com/register/forgot";
    axios
      .post(postForgotUrl, {
        email: forgotEmail,
      })
      .then(
        (response) => {
          setForgotModal({
            showModal: true,
            modalContent: "Email sent. Kindly check your mailbox",
          });
        },
        (error) => {
          setForgotModal({
            showModal: true,
            modalContent: "Server error. Please try again.",
          });
        }
      );
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: useStyles().dialog }}
    >
      <div className="dialog">
        {forgotModal.showModal && (
          <Modal
            closeModal={closeForgotModal}
            modalContent={forgotModal.modalContent}
            className={"forgot-password-modal"}
          />
        )}
        <h3>Forgot Password</h3>
        <p>Please enter your email id to receive a temporary password.</p>
        <form onSubmit={submitForgot}>
          <TextField
            autoFocus
            id="name"
            type="email"
            variant="outlined"
            required
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            autoComplete="off"
            InputProps={{
              classes: {
                root: useStyles().textField,
              },
            }}
            InputLabelProps={{
              classes: {
                root: useStyles().textField,
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            className={useStyles().forgotDialogButton}
          >
            Submit
          </Button>
        </form>
      </div>
    </Dialog>
  );
}

function RegisterForm({ modal, setModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmission = (event) => {
    event.preventDefault();
    if (username && email && password) {
      const newUser = {
        username: username,
        email: email,
        password: password,
      };
      const registerUrl = "https://dollarfinder.herokuapp.com/register";
      axios.post(registerUrl, newUser).then(
        (response) => {
          setModal({
            showModal: true,
            modalContent:
              "Verification email sent to your email. Please verify before you login.",
          });
          setUsername("");
          setEmail("");
          setPassword("");
        },
        (error) => {
          setModal({
            showModal: true,
            modalContent: "Sign Up failed. Try again!",
          });
        }
      );
    } else {
      setModal({
        showModal: true,
        modalContent: "Please fill in all the fields",
      });
    }
  };
  return (
    <form
      id="register-form-id"
      className="form register-form"
      onSubmit={handleSubmission}
    >
      <TextField
        type="email"
        name="regemail"
        placeholder="Email"
        autoComplete="off"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          classes: {
            root: useStyles().formTextField,
          },
        }}
      />
      <TextField
        type="text"
        name="regusername"
        placeholder="Username"
        autoComplete="off"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputProps={{
          classes: {
            root: useStyles().formTextField,
          },
        }}
      />
      <TextField
        type="password"
        name="regpassword"
        placeholder="Password"
        autoComplete="off"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          classes: {
            root: useStyles().formTextField,
          },
        }}
      />
      <Button
        variant="contained"
        type="submit"
        className={useStyles().loginFormButton}
      >
        Sign Up
      </Button>
    </form>
  );
}
export default Login;
