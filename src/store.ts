import { compose, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import Reactotron from "./config/reactotron";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reactotronEnhancer =
  Reactotron.createEnhancer != null ? Reactotron.createEnhancer() : null;

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: reactotronEnhancer != null ? [reactotronEnhancer] : undefined,
  middleware: [thunk],
});

export const persistor = persistStore(store);
