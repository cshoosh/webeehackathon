import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { reactotronRedux } from "reactotron-redux";

// @ts-ignore
let reactotron;

if (__DEV__) {
  // @ts-ignore
  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({
      name: "React Native hackathon",
    })
    .use(reactotronRedux())
    .useReactNative({
      asyncStorage: false, // there are more options to the async storage.
      networking: {
        // optionally, you can turn it off with false.
        ignoreUrls: /symbolicate/,
      },
      editor: false, // there are more options to editor
      errors: { veto: (stackFrame) => false }, // or turn it off with false
      overlay: false, // just turning off overlay
    })
    .setAsyncStorageHandler(AsyncStorage)
    .connect();
  reactotron.clear();
}

export default reactotron;
