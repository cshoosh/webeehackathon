import { useRoute } from "@react-navigation/native";
import MachineItemContainerList from "../../components/MachineItemContainerList";
import MachineTypeItemHeader from "../../components/MachineTypeItemHeader";
import { ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function () {
  const route = useRoute();
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView extraHeight={200}>
        <MachineTypeItemHeader type={route.params.machineType} />
        <MachineItemContainerList type={route.params.machineType} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
