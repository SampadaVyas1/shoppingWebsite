import React, { Fragment, ImgHTMLAttributes, useState } from "react";
import Image from "next/image";
import styles from "./image.module.scss";
import Typography from "../typography";
import Rectangle from "../../public/assets/images/rectangle.svg";

interface IImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "children"> {
  src: string | null;
  fallbackText?: string;
  customClass?: string;
  fallbackClass?: string;
}

const ImageComponent = (props: IImageProps) => {
  const {
    src,
    fallbackText,
    customClass,
    fallbackClass,
    width = 24,
    height = 24,
    ...otherProps
  } = props;
  const [imagePlaceholder, setImagePlaceholder] = useState<boolean>(false);

  const handleError = (event: any) => {
    event.currentTarget.onerror = null;
    if (!imagePlaceholder) setImagePlaceholder(true);
  };

  if (src && !imagePlaceholder) {
    return (
      <Fragment>
        <Image
          src={src}
          alt="image"
          className={customClass}
          onClick={props.onClick}
          draggable={false}
          width={+width}
          height={+height}
          onError={handleError}
        />
      </Fragment>
    );
  } else if (fallbackText) {
    return (
      <div
        className={`${styles.imagePlaceholder} ${fallbackClass}`}
        onClick={props.onClick}
      >
        <Typography customStyle={styles.profileText}>{fallbackText}</Typography>
      </div>
    );
  }
  return (
    <Fragment>
      <Rectangle className={customClass} onClick={props.onClick as any} />
    </Fragment>
  );
};
export default React.memo(ImageComponent);
