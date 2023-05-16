import Image from "next/image";
import loaderSpinner from "../../public/assets/icons/loader.svg";
import styles from "./loader.module.scss";
import { ILoaderProps } from "./loader.types";

const Loader = ({ customStyles }: ILoaderProps) => {
  return (
    <div className={`${styles.loadingWrapper} ${customStyles}`}>
      <Image src={loaderSpinner} className={styles.spinner} alt="loading" />
    </div>
  );
};
export default Loader;
