import React from "react";
import classes from "./list.module.scss";
const List = (props: any) => {
  const { listData, setIsShown, isShown, customStyle, renderComponent } = props;

  return (
    <div>
      <div
        className={
          isShown
            ? `${classes.listContainerWrapper} ${customStyle}`
            : classes.listNotToShow
        }
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {renderComponent && renderComponent()}
        {isShown &&
          listData?.map((listItem: any, index: number) => {
            return (
              <>
                <li className={classes.list}>{listItem.name}</li>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default List;
