import React, { Dispatch, SetStateAction } from "react";

interface Props {
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  password?: boolean;
}

const AppTextInput: React.FC<Props> = ({ label, value, onChange, password }) => {
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={password ? "password" : "text"}
        className='textinput'
        placeholder="Placeholder Text"
      />
    </div>
  );
};

export default AppTextInput;
