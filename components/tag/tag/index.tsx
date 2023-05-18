import Images from "@/public/assets/icons";
import ImageComponent from "../../image";
import styles from "./index.module.scss";
import { ITagProps } from "./tag.types";
import Typography from "../../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/types/enums";

const Tag = (props: ITagProps) => {
  const { active = false, onClick, customClass, tagValue, onDelete } = props;
  const tagClassName = active ? `${styles.active} ${styles.tag}` : styles.tag;

  return (
    <div className={`${tagClassName} ${customClass}`} onClick={onClick}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
        customStyle={styles.tagText}
      >
        {tagValue.label}
      </Typography>
      {/* {onDelete && <ImageComponent src={Images.crossIcon} onClick={onDelete} />} */}
    </div>
  );
};
export default Tag;
