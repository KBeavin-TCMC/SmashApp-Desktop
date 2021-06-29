import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  label: string;
  value: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  isChecked?: boolean;
}

const AppCheckbox: React.FC<Props> = ({ label, value, onChange, disabled, isChecked }) => {
    const [checked, setChecked] = useState(isChecked);
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
      />
    </div>
  );
};

AppCheckbox.defaultProps = {
    isChecked: false
}

export default AppCheckbox;
