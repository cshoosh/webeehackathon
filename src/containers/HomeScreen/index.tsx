import { FlatList, SectionList, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import MachineTypeItemHeader from "../../components/MachineTypeItemHeader";
import MachineItemContainerList from "../../components/MachineItemContainerList";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  const { types } = useSelector((state: RootState) => ({
    types: state.machineTypes.machineType.filter((v) => v.name),
  }));
  return (
    <SafeAreaView>
      <KeyboardAwareFlatList
        extraHeight={200}
        data={types}
        renderItem={({ item }) => (
          <View>
            <MachineTypeItemHeader type={item.name} />
            <MachineItemContainerList type={item.name} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
