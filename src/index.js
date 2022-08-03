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

const clientId =
  "93793167500-omr4gb2sjr17c2gdcvejklp2dsd9m950.apps.googleusercontent.com";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
