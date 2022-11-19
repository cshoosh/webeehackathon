import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../containers/HomeScreen";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import MachineTypeEditScreen from "../containers/MachineTypeEditScreen";
import ManageCategoryScreen from "../containers/ManageCategoryScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const { types } = useSelector((state: RootState) => ({
    types: state.machineTypes.machineType,
  }));
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={HomeScreen} />
        {types
          .filter((v) => v.name)
          .map((v, index) => (
            <Drawer.Screen
              key={v.name}
              name={v.name || ""}
              component={MachineTypeEditScreen}
              initialParams={{ machineType: v.name }}
            />
          ))}
        <Drawer.Screen
          name={"Manage Categories"}
          component={ManageCategoryScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
