import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Error from "./components/Error";
import Account from "./components/Account";
import Product from "./components/Product";
import "./app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const initialLoginState = () => {
    if (!localStorage.hasOwnProperty("dollarfinderlogin")) {
      const storeLogin = {
        logintoken: "",
        loginState: false,
      };
      localStorage.setItem("dollarfinderlogin", JSON.stringify(storeLogin));
      return false;
    } else {
      return JSON.parse(localStorage.getItem("dollarfinderlogin")).loginState;
    }
  };
  const [loginState, setLoginState] = React.useState(initialLoginState());

  return (
    <div className="body">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/account">
            {loginState ? (
              <Account setLogin={setLoginState} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/login">
            {loginState ? (
              <Redirect to="/account" />
            ) : (
              <Login setLogin={setLoginState} />
            )}
          </Route>
          <Route exact path="/product/:id" children={<Product />}></Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
