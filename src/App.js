import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory } from "react-router-dom";
import {
  setIntervalAsync,
  clearIntervalAsync,
} from "set-interval-async/dynamic";

import PrivateRoute from "./PrivateRoute";
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
import ProductDescription1 from "./components/Natureraise/ProductDescription/ProductDescription1";

import Service from "./components/Natureraise/Service/Service";

import CheckOut from "./components/Natureraise/CheckOut/CheckOut";
import PaymentFailure from "./components/Natureraise/CheckOut/failure";
import OrderDetails from "./components/Natureraise/OrderDetails/OrderDetails";
import OrderStatus from "./components/Natureraise/OrderStatus/OrderStatus";

import PrivacyPolicy from "./components/Natureraise/PrivacyPolicy/PrivacyPolicy";

import { useDispatch, useSelector } from "react-redux";
import {
  getCartList,
  resetCart,
} from "./components/Natureraise/store/actions/Product/ProductActions";
import {
  logout_user,
  refreshAuthToken,
} from "./components/Natureraise/store/actions/User/UserActions";

// Natureraise
let timer;

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated } = useSelector((state) => state.UserActions);
  const { expiryTime } = useSelector((state) => state.UserActions.user);
  const { user } = useSelector((state) => state.UserActions);
  console.log(user);

  // logout in 9 min
  // TODO: Refresh api ready? - change to refresh token
  React.useEffect(() => {
    console.log("im running");

    console.log(isAuthenticated);

    if (!isAuthenticated) {
      console.log(timer);
      if (timer) clearIntervalAsync(timer);
      return;
    }

    const expTimeLocal = localStorage.getItem("expiryTime") ?? expiryTime;
    console.log(expTimeLocal);
    if (!expTimeLocal) {
      return;
    }

    const expTime = new Date(expTimeLocal).getTime();
    const currentTime = Date.now();
    console.log(expTime, currentTime);
    if (expTime < currentTime) {
      localStorage.clear();
      dispatch(resetCart());
      dispatch(logout_user());
      history.push("/");
      return;
    }

    const remainingTime = expTime - currentTime;
    console.log("remaingin Time", remainingTime);

    timer = setIntervalAsync(() => {
      console.log("REfresh Token");
      dispatch(refreshAuthToken());
      clearIntervalAsync(timer);
    }, remainingTime);

    return () => {
      clearIntervalAsync(timer);
    };
  }, [dispatch, isAuthenticated, expiryTime, history]);

  // Get Cart when user authenticated
  React.useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) return;
    console.log("Getting Cart");
    dispatch(getCartList());
  }, [dispatch, isAuthenticated]);

  return (
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
      <PrivateRoute
        path="/MyAccount"
        name="MyAccount Page"
        component={MyAccount}
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
        path="/Blog"
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
        render={(props) => <ProductDescription1 {...props} />}
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

      <PrivateRoute
        exact
        path="/CheckOut/failure"
        name="CheckOut Page"
        component={PaymentFailure}
      />
      <PrivateRoute
        exact
        path="/OrderDetails/:id"
        name="OrderDetails Page"
        component={OrderStatus}
      />
      {/* <Route
        exact
        path="/OrderStatus"
        name="OrderStatus Page"
        render={(props) => <OrderStatus {...props} />}
      /> */}
      <Route
        exact
        path="/PrivacyPolicy"
        name="PrivacyPolicy Page"
        render={(props) => <PrivacyPolicy {...props} />}
      />
    </Switch>
  );
}

export default App;
