import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useEffect, useState } from "react";
import { Attribute } from "../../reducers/machineTypes";

export const mapAttrToMachine = (
  machineAttrs: any | undefined = {},
  actualAttributes: any | undefined = {}
) => {
  return (
    Array.from(
      new Set([...Object.keys(actualAttributes), ...Object.keys(machineAttrs)]) // Use Set to filter the duplicates
    )
      // Keep machine attributes in second parameter as we don't want to lose the values
      .filter((v) => Object.keys(actualAttributes).includes(v))
      .map((v) => ({
        [v]: { value: machineAttrs[v], type: actualAttributes[v] },
      }))
      .reduce((p, c) => ({ ...c, ...p }), {})
  );
};

const filterTypeFromArray = (type: string, machineTypes: any) => {
  // @ts-ignore
  return machineTypes.find((v) => v.name === type)?.attr;
};

const useMachineFilter = (type: string) => {
  const { machines, machineTypes } = useSelector((state: RootState) => ({
    machines: state.machines.machines,
    machineTypes: state.machineTypes.machineType,
  }));
  const [filtered, setFilter] = useState<
    { name: string | undefined; attr: {} | undefined }[]
  >([]);

  useEffect(() => {
    const mapped = machines
      .filter((machine) => machine.type === type)
      .map((machine) => ({
        name: machine.title,
        attr: mapAttrToMachine(
          machine.attr,
          filterTypeFromArray(type, machineTypes)
        ),
      }));

    setFilter(mapped);
  }, [type, machines, machineTypes]);

  return filtered;
};

export default useMachineFilter;
