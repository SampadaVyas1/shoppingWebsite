import React from "react";
import { CiStar } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import classes from "./starRating.module.scss";
import { IoStarOutline } from "react-icons/io5";
const StarRating = (props: any) => {
  const { starRating } = props;
  return (
    <div>
      {new Array(5).fill(null).map((star: any, index: any) => {
        const filledColor = index < starRating ? "rgb(250, 175, 0)" : "";
        return (
          <React.Fragment key={index}>
            {starRating - 1 < index ? (
              <IoStarOutline
                className={classes.star}
                style={{ color: "rgb(250, 175, 0)" }}
              />
            ) : (
              <IoStar
                className={classes.star}
                style={{ color: "rgb(250, 175, 0)" }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StarRating;
