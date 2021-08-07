import { Select } from "antd";

const { Option } = Select;

type Props = {
  callback: (params: any) => void
}

function EquipmentSelect({ callback }: Props) {
  return (
    <Select style={{ width: 200 }}>
      <Option value={5200}>5200</Option>
    </Select>
  )
}

export {
  EquipmentSelect
};