import { compose, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// @ts-ignore
import Reactotron from "./config/reactotron";

if (__DEV__) {
  // AsyncStorage.removeItem("persist:root");
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reactotronEnhancer =
  // @ts-ignore
  Reactotron.createEnhancer != null ? Reactotron.createEnhancer() : null;

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: reactotronEnhancer != null ? [reactotronEnhancer] : undefined,
  middleware: [thunk],
});

export const persistor = persistStore(store);
