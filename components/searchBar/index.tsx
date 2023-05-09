import ImageComponent from "../imageComponent";
import styles from "./searchBar.module.scss";
import Images from "@/public/assets/icons";
const Search = (props:any) => {
  const {placeholder,customStyle,endIcon,startIcon}=props
  const searchClass=customStyle?`${customStyle} ${styles.searchBarContainer}`:styles.searchBarContainer
  return (
    <div className={searchClass}>
     {!!startIcon &&  <ImageComponent src={startIcon}/>}
      <input type="search" className={styles.searchBar} placeholder={placeholder}/>
     {!!endIcon && <ImageComponent src={endIcon}/>}
      {/* <ImageComponent src={Images.filterIcon} customClass={styles.icons} /> */}
    </div>
  );
};

export default Search;
