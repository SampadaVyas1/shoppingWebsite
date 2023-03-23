import Image from "next/image";
import loaderSpinner from "../../public/assets/icons/loader.svg";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loadingWrapper}>
      <Image src={loaderSpinner} className={styles.spinner} alt="loading" />
    </div>
  );
};
export default Loader;
