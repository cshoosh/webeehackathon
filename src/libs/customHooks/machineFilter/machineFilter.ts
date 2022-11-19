import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { useEffect, useState } from "react";
import R from "ramda";

export const mapAttrToMachine = (
  machineAttrs: Array<string[]> | undefined,
  actualAttributes: Array<string[]> | undefined
) => {
  // @ts-ignore

  return (actualAttributes || [])
    .map((v) => {
      // @ts-ignore
      return {
        [v[0]]: {
          value: R.compose(
            R.path(["1"]),
            R.find((f) => f[0] === v[0])
          )(machineAttrs),
          type: v[1],
        },
      };
    })
    .reduce((p, c) => ({ ...c, ...p }), {});
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
    const machineTypeAttr = machineTypes.find((v) => v.name === type);
    const mapped = machines
      .filter((machine) => machine.type === type)
      .map((machine) => ({
        name: machine.title,
        titleField: machineTypeAttr?.title,
        key: machine.key,
        attr: mapAttrToMachine(R.toPairs(machine.attr), machineTypeAttr?.attr),
      }));

    setFilter(R.reverse(mapped));
  }, [type, machines, machineTypes]);

  return filtered;
};

export default useMachineFilter;
