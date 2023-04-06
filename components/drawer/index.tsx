import Images from "@/public/assets/icons";
import styles from "./drawer.module.scss";
import ImageComponent from "../image";
import TransitionWrapper from "../transitionWrapper";

interface IDrawerProps {
  title?: JSX.Element | string;
  onClose?: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
  customDrawerStyle?: string;
  customHeaderStyle?: string;
}

const Drawer = (props: IDrawerProps) => {
  const {
    title,
    onClose,
    children,
    isOpen,
    customDrawerStyle,
    customHeaderStyle,
  } = props;

  const handleDrawerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <TransitionWrapper animationClassName="drawer">
      <div className={styles.drawerBackdrop} onClick={onClose}>
        <div
          className={`${styles.drawer} ${customDrawerStyle}`}
          onClick={handleDrawerClick}
        >
          <div className={`${styles.title} ${customHeaderStyle}`}>
            {title}
            <ImageComponent
              src={Images.close}
              onClick={onClose}
              customClass={styles.closeIcon}
            />
          </div>

          <div className={styles.drawerBody}>{children}</div>
        </div>
      </div>
    </TransitionWrapper>
  );
};
export default Drawer;
