import styles from "./container.module.scss";
import { IContainerProps } from "./container.types";

const Container = (props: IContainerProps) => {
  const { children, customClass } = props;
  return <div className={`${styles.container} ${customClass}`}>{children}</div>;
};
export default Container;
