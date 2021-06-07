import React from "react";
import Colors from "../../constants/Colors";

interface Props {
  label: string;
  onClick: any;
  backgroundColor?: string;
  color?: string;
  size?: string;
  disabled?: boolean;
}

const AppButton: React.FC<Props> = ({ label, onClick, backgroundColor, color, size, disabled }) => {
  return (
    <div style={{display: 'inline', paddingLeft: 5, paddingRight: 5}}>
      <button
        onClick={() => onClick()}
        type="button"
        className={`btn btn-outline-primary ${size}`}
        style={{backgroundColor: backgroundColor && backgroundColor, color: color && color, borderColor: 'white'}}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

AppButton.defaultProps = {
    backgroundColor: Colors.SMT_Secondary_2_Dark_1,
    color: Colors.SMT_Tertiary_1,
};

export default AppButton;
