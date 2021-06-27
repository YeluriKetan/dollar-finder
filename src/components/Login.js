import React, { useState } from "react";
import "./login.css";
import userService from "./services/userservice";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";

function Login({ setLogin }) {
  const [formSelect, setFormSelect] = useState(0);
  console.log("oye");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin(true);
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
      />
      <br />
      <input
        type="password"
        name="loginpassword"
        placeholder="Password"
        className="form-text-field password-field"
        autoComplete="off"
      />
      <br />
      <button type="submit" className="form-submit">
        Login
      </button>
      <a
        href="https://www.youtube.com"
        id="forgot-password-id"
        className="forgot-password"
        rel="noreferrer"
      >
        Forgot password?
      </a>
    </form>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmission = (event) => {
    event.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    userService.create(newUser).then((response) => {
      console.log(response);
    });
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
      <br />
      <input
        type="text"
        value={username}
        name="regpassword"
        placeholder="Username"
        className="form-text-field password-field"
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        name="regusername"
        placeholder="Password"
        className="form-text-field username-field"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" className="form-submit">
        Register
      </button>
    </form>
  );
}
export default Login;
