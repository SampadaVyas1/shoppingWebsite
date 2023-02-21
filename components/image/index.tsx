/* eslint-disable @next/next/no-img-element */
import React, { Fragment, ImgHTMLAttributes, useState } from "react";
import styles from "./index.module.scss";
import Typography from "../typography";
import Rectangle from "../../public/assets/images/rectangle.svg";
import Image from "next/image";

interface IImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "children"> {
  src: string | null;
  fallbackText?: string;
  customClass?: string;
  fallbackClass?: string;
}

function ImageComponent(props: IImageProps) {
  const { src, fallbackText, customClass, fallbackClass, ...otherProps } =
    props;
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
          draggable={false}
          width={40}
          height={40}
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
        <Typography customStyle={styles.profileText}>
          {fallbackText.split(" ")[0][0]}
        </Typography>
      </div>
    );
  }
  return (
    <Fragment>
      <Rectangle className={customClass} onClick={props.onClick as any} />
    </Fragment>
  );
}
export default ImageComponent;
