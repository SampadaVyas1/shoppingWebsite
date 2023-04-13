import ImageComponent from "../image";
import styles from "./searchBar.module.scss";
import Images from "@/public/assets/icons";
const Search = () => {
  return (
    <div className={styles.searchBarContainer}>
      <input type="search" className={styles.searchBar} />
      <ImageComponent src={Images.filterIcon} customClass={styles.icons} />
    </div>
  );
};

export default Search;
