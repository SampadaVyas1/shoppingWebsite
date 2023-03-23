import { useCallback, useState } from "react";
import styles from "./buttonGroup.module.scss";
import Button from "../button";
import { ORIENTATIONS } from "@/common/enums";

interface IButtonGroupProps {
  buttons: string[];
  orientation?: ORIENTATIONS.VERTICAL | ORIENTATIONS.HORIZONTAL;
  onButtonClick?: (event: any) => void;
  containerClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
}

const ButtonGroup = (props: IButtonGroupProps) => {
  const {
    buttons,
    orientation = ORIENTATIONS.HORIZONTAL,
    onButtonClick,
    containerClassName,
    buttonClassName,
    activeButtonClassName,
  } = props;

  const [activeButton, setActiveButton] = useState<number>(0);
  const buttonStyle = buttonClassName || styles.buttons;
  const activeButtonClass = activeButtonClassName || styles.activeButton;

  const handleButtonClick = useCallback(
    (index: number) => () => {
      setActiveButton(index);
      onButtonClick && onButtonClick(index);
    },
    [onButtonClick]
  );
  return (
    <div
      className={`${styles.buttonGroupWrapper} ${containerClassName} ${styles[orientation]}`}
    >
      {buttons.length &&
        buttons.map((label, index) => (
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
