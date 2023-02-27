import { useCallback, useState } from "react";
import Button from "../button";
import styles from "./buttonGroup.module.scss";

interface IButtonGroupProps {
  buttons: string[];
  orientation?: "vertical" | "horizontal";
  onButtonClick?: (event: any) => void;
  containerClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
}

const ButtonGroup = (props: IButtonGroupProps) => {
  const {
    buttons,
    orientation = "horizontal",
    onButtonClick,
    containerClassName,
    buttonClassName,
    activeButtonClassName,
  } = props;

  const [activeButton, setActiveButton] = useState<number>(0);

  const handleButtonClick = useCallback(
    (index: number) => () => {
      setActiveButton(index);
      onButtonClick && onButtonClick(index);
    },
    [onButtonClick]
  );
  const buttonStyle = buttonClassName || styles.buttons;
  const activeButtonClass = activeButtonClassName || styles.activeButton;
  return (
    <div
      className={`${styles.buttonGroupWrapper} ${containerClassName} ${styles[orientation]}`}
    >
      {buttons.map((label, index) => (
        <Button
          onClick={handleButtonClick(index)}
          key={index}
          customStyle={
            index === activeButton
              ? `${buttonStyle} ${activeButtonClass}`
              : buttonStyle
          }
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
export default ButtonGroup;
