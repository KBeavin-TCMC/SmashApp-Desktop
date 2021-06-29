import React, {useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

interface Props {
  label: string;
  value: any;
  list: { id: string; label: string; value: string }[];
  onChange: any;
  disabled?: boolean;
}

const AppDropDown: React.FC<Props> = ({
  label,
  value,
  onChange,
  list,
  disabled,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    let menu = document.getElementsByClassName('app-dropdown__menu');
    console.log(menu);
      if (!value) {
          setSelectedOption(list[0]);
        }
  }, [value, list]);

  return (
    <div className="app-dropdown">
      <label className="dropdown-label">{label}</label>
      <Select
        className="app-dropdown-select"
        classNamePrefix="app-dropdown"
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={(itemValue) => {
          setSelectedOption(itemValue);
          onChange(itemValue.value);
        }}
        options={list}
        isDisabled={disabled}
      />
    </div>
  );
};

export default AppDropDown;
