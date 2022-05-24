import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Homepage from './components/Homepage/Homepage';
import SignIn from "./components/SignInPage/SignIn";
import SignUp from "./components/SignUpPage/SignUp";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";

import MyAccount from "./components/MyAccount/MyAccount";
import Faq from "./components/Faq/Faq";

// Natureraise

import Homepage from "./components/Natureraise/Homepage/Homepage";
import About from "./components/Natureraise/About/About";
import Contact from "./components/Natureraise/Contact/Contact";

import BlogList from "./components/BlogList/BlogList";
import BlogDetails from "./components/BlogDetails/BlogDetails";
import ProductList from "./components/Natureraise/ProductList/ProductList";
import ProductDescription from "./components/Natureraise/ProductDescription/ProductDescription";

import Service from "./components/Natureraise/Service/Service";

import CheckOut from "./components/Natureraise/CheckOut/CheckOut";
import OrderDetails from "./components/Natureraise/OrderDetails/OrderDetails";
import OrderStatus from "./components/Natureraise/OrderStatus/OrderStatus";

import PrivacyPolicy from "./components/Natureraise/PrivacyPolicy/PrivacyPolicy";

// Natureraise
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          name="SiteHome Page"
          render={(props) => <Homepage {...props} />}
        />
        <Route
          exact
          path="/SignIn"
          name="SignIn Page"
          render={(props) => <SignIn {...props} />}
        />
        <Route
          exact
          path="/SignUp"
          name="SignUp Page"
          render={(props) => <SignUp {...props} />}
        />
        <Route
          exact
          path="/ForgetPassword"
          name="ForgetPassword Page"
          render={(props) => <ForgetPassword {...props} />}
        />
        <Route
          exact
          path="/Contact"
          name="ForgetPassword Page"
          render={(props) => <Contact {...props} />}
        />
        <Route
          exact
          path="/MyAccount"
          name="MyAccount Page"
          render={(props) => <MyAccount {...props} />}
        />
        <Route
          exact
          path="/Faq"
          name="Faq Page"
          render={(props) => <Faq {...props} />}
        />
        <Route
          exact
          path="/About"
          name="About Page"
          render={(props) => <About {...props} />}
        />
        <Route
          exact
          path="/BlogList"
          name="BlogList Page"
          render={(props) => <BlogList {...props} />}
        />
        <Route
          exact
          path="/BlogDetails"
          name="BlogDetails Page"
          render={(props) => <BlogDetails {...props} />}
        />
        <Route
          exact
          path="/ProductDescription/:id"
          name="ProductDescription Page"
          render={(props) => <ProductDescription {...props} />}
        />
        <Route
          exact
          path="/Products/:id"
          name="ProductList Page"
          render={(props) => <ProductList {...props} />}
        />
        <Route
          exact
          path="/Service"
          name="Service Page"
          render={(props) => <Service {...props} />}
        />
        <Route
          exact
          path="/CheckOut"
          name="CheckOut Page"
          render={(props) => <CheckOut {...props} />}
        />
        <Route
          exact
          path="/OrderDetails"
          name="OrderDetails Page"
          render={(props) => <OrderDetails {...props} />}
        />
        <Route
          exact
          path="/OrderStatus"
          name="OrderStatus Page"
          render={(props) => <OrderStatus {...props} />}
        />
        <Route
          exact
          path="/PrivacyPolicy"
          name="PrivacyPolicy Page"
          render={(props) => <PrivacyPolicy {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
