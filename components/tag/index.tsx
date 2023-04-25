import styles from "./index.module.scss";
import { ITagProps } from "./tag.types";

const Tag = (props: ITagProps) => {
  const { active = false, onClick, customClass, tagValue } = props;
  const tagClassName = active ? `${styles.active} ${styles.tag}` : styles.tag;

  return (
    <div className={`${tagClassName} ${customClass}`} onClick={onClick}>
      {tagValue.label}
    </div>
  );
};
export default Tag;
