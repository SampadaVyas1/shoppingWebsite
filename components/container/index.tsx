import { ReactNode } from "react";
import styles from "./container.module.scss";

interface IContainerProps {
  children: ReactNode;
  customClass?: string;
}

const Container = (props: IContainerProps) => {
  const { children, customClass } = props;
  return <div className={`${styles.container} ${customClass}`}>{children}</div>;
};
export default Container;
