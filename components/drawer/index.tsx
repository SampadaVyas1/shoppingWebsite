import Images from "@/public/assets/icons";
import styles from "./drawer.module.scss";
import ImageComponent from "../image";
import { CSSTransition } from "react-transition-group";

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
    <CSSTransition in={isOpen} timeout={300} classNames="drawer" unmountOnExit>
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
    </CSSTransition>
  );
};
export default Drawer;
