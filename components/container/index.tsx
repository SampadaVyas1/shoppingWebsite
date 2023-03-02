import styles from "./container.module.scss";

const Container = (props: any) => {
  const { children, customClass } = props;
  return <div className={`${styles.container} ${customClass}`}>{children}</div>;
};
export default Container;
