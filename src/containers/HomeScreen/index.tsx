import { FlatList, SectionList, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import MachineTypeItemHeader from "../../components/MachineTypeItemHeader";
import MachineItemContainerList from "../../components/MachineItemContainerList";

export default function () {
  const { types } = useSelector((state: RootState) => ({
    types: state.machineTypes.machineType,
  }));
  return (
    <FlatList
      data={types}
      renderItem={({ item }) => (
        <View>
          <MachineTypeItemHeader type={item.name} />
          <MachineItemContainerList type={item.name} />
        </View>
      )}
    />
  );
}
