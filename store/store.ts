import {createStore, applyMiddleware, combineReducers} from "redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {stepsReducer} from "./redusers/stepsReducer"
import {userReducer} from "./redusers/userReducer";
import {authReducer} from "./redusers/authReducer";
import {friendsReducer} from "./redusers/friendsReducer";

import { createWrapper } from "next-redux-wrapper";

// validation pourcentage 
// verifier font 
// logo temporaire login 
// verifier les icones 
// Track en DB 
// Vitesse Login - 
// 
const rootReducer = combineReducers({
    stepsReducer: stepsReducer,
    userReducer: userReducer,
    authReducer: authReducer,
    friendsReducer: friendsReducer,
})
const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,

  });
  export type AppStore = ReturnType<typeof makeStore>;
  export type AppState = ReturnType<AppStore["getState"]>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
  >;

  export const wrapper = createWrapper<AppStore>(makeStore);