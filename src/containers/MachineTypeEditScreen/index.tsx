import { useRoute } from "@react-navigation/native";
import MachineItemContainerList from "../../components/MachineItemContainerList";
import MachineTypeItemHeader from "../../components/MachineTypeItemHeader";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  const route = useRoute();
  return (
    <SafeAreaView>
      <ScrollView>
        <MachineTypeItemHeader type={route.params.machineType} />
        <MachineItemContainerList type={route.params.machineType} />
      </ScrollView>
    </SafeAreaView>
  );
}
