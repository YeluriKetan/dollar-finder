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

function App() {
  const [loginState, setLoginState] = React.useState(false);
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
            <Account login={loginState} setLogin={setLoginState} />
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
