import {
  cloneElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { JsxElement } from "typescript";
import styles from "./index.module.scss";

interface IButtonGroupProps {
  activeButton: number;
  children: any[];
  onActiveButtonClick: () => void;
}

const ButtonGroup = (props: any) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { activeButton, children } = props;

  const handleButtonClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
    },
    [activeIndex]
  );

  useEffect(() => {
    setActiveIndex(activeButton);
  }, [activeButton]);

  const customClass = "";

  return (
    <div className={styles.buttonGroup}>
      {children.map((element: any, index: number) => {
        return cloneElement(element, {
          className:
            index === activeIndex
              ? `${styles.buttonModified} ${styles.activeButton}`
              : `${styles.buttonModified}`,
          onClick: index === activeIndex ? handleButtonClick : undefined,
        });
      })}
    </div>
  );
};
export default ButtonGroup;
