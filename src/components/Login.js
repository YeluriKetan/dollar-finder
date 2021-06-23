import React, { useState } from "react";
import "./login.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";

function Login() {
  const [loginValue, setLoginValue] = useState(0);
  console.log("oye");
  let form = () => {
    if (loginValue) {
      return <RegisterForm />;
    } else {
      return <LoginForm />;
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
          loginValue={loginValue}
          changeLoginValue={setLoginValue}
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
function Selector({ loginValue, changeLoginValue }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Tabs
          value={loginValue}
          indicatorColor="primary"
          onChange={(event, newValue) => changeLoginValue(newValue)}
        >
          <Tab label="Login" className={useStyles().tab} />
          <Tab label="Register" className={useStyles().tab} />
        </Tabs>
      </ThemeProvider>
    </>
  );
}
function LoginForm() {
  return (
    <form
      id="login-form-id"
      className="form login-form"
      onSubmit={(e) => e.preventDefault()}
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
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
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
  return (
    <form
      id="register-form-id"
      className="form register-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        name="regemail"
        placeholder="Email"
        className="form-text-field email-field"
        autoComplete="off"
      />
      <br />
      <input
        type="password"
        name="regpassword"
        placeholder="Username"
        className="form-text-field password-field"
        autoComplete="off"
      />
      <br />
      <input
        type="text"
        name="regusername"
        placeholder="Password"
        className="form-text-field username-field"
        autoComplete="off"
      />
      <br />
      <button type="submit" className="form-submit">
        Register
      </button>
    </form>
  );
}
export default Login;
