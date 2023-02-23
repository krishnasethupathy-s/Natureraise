import * as redux from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import UserActions from "./reducers/User/UserActions";
import Banner from "./reducers/Sitedata/Banner";
import AddCustomerAddress from "./reducers/UserProfile/CustomerAddress";
import ProductActions from "./reducers/Product/ProductActions";

import { persistStore, persistReducer, createMigrate } from "redux-persist";
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

const migrations = {
  1: (state) => {
    return {
      ...state,
      ProductActions: {
        ...state.ProductActions,
        coupons: [],
        category_products: [],
        category_data_list: [],
      },
    };
  },
  2: (state) => {
    return {
      ...state,
      ProductActions: {
        ...state.ProductActions,
        coupons: [],
        category_products: [],
        category_data_list: [],
      },
    };
  },
  3: (state) => {
    return {
      ...state,
      ProductActions: {
        ...state.ProductActions,
        category_products: [],
        category_data_list: [],
      },
    };
  },

  4: (state) => {
    return {
      ...state,
      ProductActions: {
        ...state.ProductActions,
        category_products: [],
        category_data_list: [],
        cart: {
          items: [],
          save_amount: 0,
          order_amount: 0,
          mrp_amount: 0,
          coupon_validation_amount: 0,
          coupon_code: null,
        },
      },
    };
  },
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["UserActions"],
  version: 4,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: false }),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = redux.createStore(
  persistedReducer,
  composeWithDevTools(redux.applyMiddleware(thunk))
);

export const persistedStore = persistStore(store);
