import React, { Dispatch, SetStateAction } from "react";

interface Props {
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  type?: string;
  disabled?: boolean;
}

const AppTextInput: React.FC<Props> = ({ label, value, onChange, type, disabled }) => {
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
        type={type}
        className='textinput'
        placeholder="Placeholder Text"
        disabled={disabled}
      />
    </div>
  );
};

AppTextInput.defaultProps = {
  type: 'text'
}

export default AppTextInput;
