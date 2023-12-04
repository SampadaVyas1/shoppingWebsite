import React, { useEffect, useState } from "react";
import classes from "./imageSlider.module.scss";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";

const ImageSlider = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const showPreious = () => {
    imageIndex === 0
      ? setImageIndex(array.length - 1)
      : setImageIndex(imageIndex - 1);
  };
  const showNext = () => {
    array.length - 1 === imageIndex
      ? setImageIndex(0)
      : setImageIndex(imageIndex + 1);
  };
  let array = [
    {
      imgUrl:
        "https://img.freepik.com/free-vector/fashion-sale-with-discount-template_23-2148936503.jpg?w=1060&t=st=1701411832~exp=1701412432~hmac=6885c4867728c3cecec2c0103f8dce0a9a8964b91fd7858eae7893e96ea7bdf3",
    },
    {
      imgUrl:
        "https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?w=1380&t=st=1701411989~exp=1701412589~hmac=e488321d6048896883fb99748aa907058d63425f2404cbaf0ae996fe12eed9e3",
    },
    {
      imgUrl:
        "https://img.freepik.com/free-psd/fashion-model-banner-template_23-2148858374.jpg?w=1380&t=st=1701412039~exp=1701412639~hmac=500089c8862c559934fd73f60cbae8bff4d1248eafd3e00b877dec0955d589f2",
    },
    {
      imgUrl:
        "https://img.freepik.com/free-psd/banner-fashion-store-template_23-2148707243.jpg?w=1380&t=st=1701412068~exp=1701412668~hmac=5eb71ca41e44d7b2451fdecebec35fdb2b16575f79b8d79a980685ef369778ef",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      showNext();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [imageIndex]);
  return (
    <div>
      <div className={classes.imageContainer}>
        {array.map((element, index) => (
          // eslint-disable-next-line @next/next/no-img-element

          <img
            key={index}
            src={element.imgUrl}
            alt=""
            className={classes.imageSlider}
            height={750}
            style={{
              display: "flex",
              transform: `translateX(-${imageIndex * 100}%)`, // Adjusts the position for smooth transition
            }}
          />
        ))}
        <div className={classes.ButtonContainerWrapper}>
          {array.map((element: any, index: number) => {
            return (
              <div key={index} className={classes.buttonContainer}>
                <div
                  onClick={() => setImageIndex(index)}
                  className={classes.button}
                >
                  {imageIndex == index ? <FaDotCircle /> : <FaCircle />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <MdNavigateBefore onClick={showPreious} />
      <MdNavigateNext onClick={showNext} /> */}
    </div>
  );
};

export default ImageSlider;
