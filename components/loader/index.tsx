import Image from "next/image";
import loaderSpinner from "../../public/assets/images/loader.svg";
import ImageComponent from "../image";
import styles from "./index.module.scss";

const Loader = () => {
  return (
    <div className={styles.loadingWrapper}>
      <Image src={loaderSpinner} className={styles.spinner} alt="loading" />
    </div>
  );
};
export default Loader;
