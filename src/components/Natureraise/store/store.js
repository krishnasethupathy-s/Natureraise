import * as redux from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import UserActions from "./reducers/User/UserActions";
import Banner from "./reducers/Sitedata/Banner";
import AddCustomerAddress from "./reducers/UserProfile/CustomerAddress";
import ProductActions from "./reducers/Product/ProductActions";

import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import OrderReducer from "./reducers/Order/OrderReducer";

const rootReducer = redux.combineReducers({
  UserActions: UserActions,
  Banner: Banner,
  AddCustomerAddress: AddCustomerAddress,
  ProductActions: ProductActions,
  OrderReducer: OrderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["UserActions"],
  version: 0,
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = redux.createStore(
  persistedReducer,
  composeWithDevTools(redux.applyMiddleware(thunk))
);

export const persistedStore = persistStore(store);
