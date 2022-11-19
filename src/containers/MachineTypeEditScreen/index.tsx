import { useRoute } from "@react-navigation/native";

export default function () {
  const route = useRoute();
  // @ts-ignore
  console.log(route.params.machineType);
  return null;
}
