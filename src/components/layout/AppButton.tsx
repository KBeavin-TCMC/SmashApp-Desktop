import React from "react";

interface Props {
  label: string;
  onClick: any;
  backgroundColor?: string;
  secondary?: boolean;
  size?: string;
  disabled?: boolean;
  outlined?: boolean;
  icon?: { type: string; name: string };
  className?: string;
  block?: boolean;
}

const AppButton: React.FC<Props> = ({
  label,
  onClick,
  secondary,
  backgroundColor,
  size,
  disabled,
  outlined,
  icon,
  block,
}) => {
  const getClassNames = (): string => {
    let classNames: string = "button";

    if (!secondary) {
      classNames = classNames + " primary";
    } else {
      classNames = classNames + " secondary";
    }

    if (outlined) classNames = classNames + " outlined";
    if (size) classNames = classNames + " " + size;
    if (block) classNames = classNames + " block";
    if (disabled) classNames = classNames + " disabled";

    return classNames;
  };

  const getContainerStyles = () => {
    let styles: any = { display: "inline", paddingLeft: 5, paddingRight: 5 };

    if (block) styles["width"] = "100%";

    return styles;
  };

  return (
    <div style={getContainerStyles()}>
      <button
        onClick={() => onClick()}
        type="button"
        className={getClassNames()}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default AppButton;
