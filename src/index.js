import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/font-awesome/css/font-awesome.min.css";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistedStore } from "./components/Natureraise/store/store";

import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactGA from "react-ga4";
import { HelmetProvider } from "react-helmet-async";

import Config from "./Config";

const clientId = Config.gooleLogin;

// ReactGA.initialize(Config.GA);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <HelmetProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
