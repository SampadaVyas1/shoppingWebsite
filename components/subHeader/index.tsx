import React, { useEffect, useState } from "react";
import { TbCategoryFilled } from "react-icons/tb";
import { MdNavigateNext } from "react-icons/md";
import classes from "./subHeader.module.scss";
import { RiArrowDropDownLine } from "react-icons/ri";
import List from "../list";
import { useDispatch, useSelector } from "react-redux";
import { categoriesList } from "@/reduxSaga/actions/actions";
const SubHeader = () => {
  const [isShown, setIsShown] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<number>();
  const [subListData, setSubListData] = useState([]);
  const dispatch = useDispatch();
  const subHeadingTitle = useSelector(
    (state: any) => state.categoriesFetchList
  );

  useEffect(() => {
    dispatch(categoriesList());
  }, [dispatch]);

  const onMouseEnterFunction = (id: number, subList: any) => {
    setIsShown(true);
    setHoveredElement(id);
    setSubListData(subList);
  };

  const onMouseLeaveFunction = () => {
    setIsShown(false);
  };
  return (
    <div className={classes.subHeaderContainer}>
      <div className={classes.categories}>
        <TbCategoryFilled className={classes.categoriesIcon} />
        Categories
        <MdNavigateNext className={classes.categoriesIcon} />
      </div>
      <div
        className={classes.listAndTitle}
        // onMouseLeave={() => setIsSubHeaderHovered(false)}
      >
        <div className={classes.subHeadingTitleContainer}>
          {subHeadingTitle.map((element: any, index: any) => {
            return (
              <>
                <div
                  key={index}
                  className={classes.headingWrapper}
                  onMouseEnter={() =>
                    onMouseEnterFunction(element.id, element.subList)
                  }
                  onMouseLeave={() => onMouseLeaveFunction()}

                  // onMouseOver={() =>
                  //   onMouseEnterFunction(element.id, element.subList)
                  // }
                  // onClick={() =>
                  //   onMouseEnterFunction(element.id, element.subList)
                  // }
                >
                  <div className={classes.title}>
                    {element.title}
                    <RiArrowDropDownLine className={classes.dropDownIcon} />
                  </div>
                  {element.id === hoveredElement ? (
                    <List
                      listData={subListData}
                      isShown={isShown}
                      setIsShown={setIsShown}
                    />
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
