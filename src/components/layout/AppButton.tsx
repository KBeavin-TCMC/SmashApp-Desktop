import React from "react";
import Colors from "../../constants/Colors";

interface Props {
  label: string;
  onClick: any;
  backgroundColor?: string;
  color?: string;
  size?: string;
  disabled?: boolean;
  outlined?: boolean;
  icon?: {type: string; name: string};
  className?: string;
}

const AppButton: React.FC<Props> = ({ label, onClick, backgroundColor, size, disabled, outlined, icon }) => {
  
  const getClassNames = (): string => {
    let classNames: string = 'button primary';

    if (outlined) classNames = classNames + ' outlined';
    if (size) classNames = classNames + ' ' + size;

    return classNames;
  }

  return (
    <div style={{ display: "inline", paddingLeft: 5, paddingRight: 5 }}>
      <button
        onClick={() => onClick()}
        type="button"
        className={getClassNames()}
        style={{backgroundColor: backgroundColor}}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

// AppButton.defaultProps = {
//     backgroundColor: Colors.SMT_Secondary_2_Dark_1,
//     color: Colors.SMT_Tertiary_1,
// };

export default AppButton;
