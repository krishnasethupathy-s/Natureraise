import * as redux from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';



import UserActions from './reducers/User/UserActions';
import Banner from './reducers/Sitedata/Banner';
import AddCustomerAddress from './reducers/UserProfile/CustomerAddress';
import ProductActions from './reducers/Product/ProductActions';


import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = redux.combineReducers({
    UserActions:UserActions,
    Banner:Banner,
    AddCustomerAddress:AddCustomerAddress,
    ProductActions:ProductActions
   });
    
  const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  
export const store = redux.createStore(persistedReducer,composeWithDevTools(redux.applyMiddleware(thunk)));

export const persistedStore =persistStore(store);
