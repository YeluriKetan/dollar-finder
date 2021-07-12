import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import Modal from "./Modal";
function Login({ setLogin }) {
  const [formSelect, setFormSelect] = useState(0);
  let form = () => {
    if (formSelect) {
      return <RegisterForm />;
    } else {
      return <LoginForm setLogin={setLogin} />;
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
    fontSize: 30,
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
          <Tab label="Register" className={useStyles().tab} />
        </Tabs>
      </ThemeProvider>
    </>
  );
}
function LoginForm({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const oldUser = {
        username: username,
        password: password,
      };
      axios.post("https://dollarfinder.herokuapp.com/login", oldUser).then(
        (response) => {
          var data = response.data;
          const storeLogin = {
            ...data,
            loginState: true,
          };
          localStorage.setItem("dollarfinderlogin", JSON.stringify(storeLogin));
          setLogin(true);
        },
        (error) => {
          setModalContent("Incorrect username or password");
          setShowModal(true);
        }
      );
    } else {
      setModalContent("Please fill in all the fields");
      setShowModal(true);
    }
  };
  return (
    <form
      id="login-form-id"
      className="form login-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="loginusername"
        placeholder="Username"
        className="form-text-field email-field"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="loginpassword"
        placeholder="Password"
        className="form-text-field password-field"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="form-submit">
        Login
      </button>
      <a
        href="https://www.youtube.com"
        id="forgot-password-id"
        className="forgot-password"
        rel="noreferrer"
        target="_blank"
      >
        Forgot password?
      </a>
      {showModal && (
        <Modal
          closeModal={closeModal}
          modalContent={modalContent}
          classname={"login-modal"}
        />
      )}
    </form>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    if (username && email && password) {
      const newUser = {
        username: username,
        email: email,
        password: password,
      };
      axios.post("https://dollarfinder.herokuapp.com/register", newUser).then(
        (response) => {
          setModalContent("Registration successful. Proceed to login");
          setShowModal(true);
        },
        (error) => {
          console.log(error);
          setModalContent("Registration failed. Try again!");
          setShowModal(true);
        }
      );
    } else {
      setModalContent("Please fill in all the fields");
      setShowModal(true);
    }
  };
  return (
    <form
      id="register-form-id"
      className="form register-form"
      onSubmit={handleSubmission}
    >
      <input
        type="text"
        value={email}
        name="regemail"
        placeholder="Email"
        className="form-text-field email-field"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={username}
        name="regpassword"
        placeholder="Username"
        className="form-text-field password-field"
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        name="regusername"
        placeholder="Password"
        className="form-text-field username-field"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="form-submit">
        Register
      </button>
      {showModal && (
        <Modal
          closeModal={closeModal}
          modalContent={modalContent}
          classname={"login-modal"}
        />
      )}
    </form>
  );
}
export default Login;
