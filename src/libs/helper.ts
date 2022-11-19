import { Dimensions } from "react-native";
import { useEffect, useState } from "react";

export const getScreenWidth = () => {
  return Dimensions.get("screen").width;
};

export const isBigScreen = () => {
  const [isBigScreen, setBigScreen] = useState(getScreenWidth() > 480);
  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      setBigScreen(getScreenWidth() > 480);
    });
  }, []);
  return isBigScreen;
};
