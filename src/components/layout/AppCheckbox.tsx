import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  label: string;
  value: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
}

const AppCheckbox: React.FC<Props> = ({ label, value, onChange, disabled }) => {
    const [checked, setChecked] = useState(value);

  return (
    <div
      className='app-textinput'
    >
      <label
        className='textinput-label'
      >
        {label}
      </label>
      <input
        onChange={() => {
            setChecked(!checked);
            onChange(!checked);
        }}
        type={'checkbox'}
        className='textinput'
        placeholder="Placeholder Text"
        disabled={disabled}
        checked={value}
      />
    </div>
  );
};

export default AppCheckbox;
