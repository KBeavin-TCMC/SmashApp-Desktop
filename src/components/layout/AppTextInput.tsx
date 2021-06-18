import React, { Dispatch, SetStateAction } from "react";

interface Props {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  password?: boolean;
}

const AppTextInput: React.FC<Props> = ({ value, onChange, password }) => {
  return (
    <div className="input-group mb-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={password ? "password" : "text"}
        className="form-control"
        placeholder="Placeholder Text"
      />
    </div>
  );
};

export default AppTextInput;
