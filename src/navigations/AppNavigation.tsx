import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../containers/HomeScreen";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import MachineTypeEditScreen from "../containers/MachineTypeEditScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const { types } = useSelector((state: RootState) => ({
    types: state.machineTypes.machineType,
  }));
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        {types.map((v) => (
          <Drawer.Screen
            key={v.name}
            name={v.title || v.name}
            component={MachineTypeEditScreen}
            initialParams={{ machineType: v.name }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
