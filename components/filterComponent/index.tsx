import React, { useState } from "react";
import Typography from "@/components/typography";
import Card from "@/components/card";
import CustomCheckBox from "@/components/customCheckBox";
import ImageComponent from "@/components/imageComponent";
import MulitSelectCheckBOX from "./multiSelectCheckBox/index"
import Button from "@/components/button";
import Images from "@/public/assets/icons";
import styles from "./filterComponent.module.scss";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";

const Filter = ({ onClose, filterData }: any) => {
  const [selectedFilter, setSelectedFilter] = useState<any>(null);
  const updatedFilterBy = !!filterData && filterData.map((filterObj: any) => {
    const key = Object.keys(filterObj)[0];
    const updatedKey = key
      .replace(/[A-Z]/g, (match) => ` ${match}`)
      .replace(/^./, (str) => str.toUpperCase());
    return {
      name: updatedKey,
      type: key,
      value: filterObj[key],
    };
  });
  const handleFilterClick = (filterData: any) => {
    if (filterData?.type == selectedFilter?.type) {
      setSelectedFilter(null);
    } else setSelectedFilter(filterData);
  };
  return (
    <Card customClass={styles.messageFilter}>
      <React.Fragment>
        <div className={styles.filterWrapper}>
          <div className={styles.filterContainer}>
            <div className={styles.filterHeader}>
              <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}>
                Filter By
              </Typography>
              <div className={styles.clearButton}>Clear all</div>
            </div>
            <div className={styles.filters}>
              {updatedFilterBy.map((filter:any, index: number) => {
                const customStyle =
                  filter.type === selectedFilter?.type
                    ? `${styles.mainFilters} ${styles.activeFilter}`
                    : styles.mainFilters;
                return (
                  <div
                    className={customStyle}
                    key={index}
                    onClick={() => handleFilterClick(filter)}
                  >
                    <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>
                      {filter.name}
                    </Typography>
                    <ImageComponent src={Images.rightChevron} />
                  </div>
                );
              })}
            </div>
          </div>
          {!!selectedFilter && (
            <div className={styles.filterContainer}>
              <div className={styles.filterHeader}>
                <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}>
                  {selectedFilter?.name}
                </Typography>
                <div className={styles.clearButton}>Clear</div>
              </div>
              <div className={styles.filters}>
                <MulitSelectCheckBOX 
                  options={selectedFilter.value.map((data:any, index:any)=> ({id:index, label:data}))}
                  searchable
                  customStyle={styles.techFilter}
                  selectedValues={[]}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.filterFooter}>
          <Button variant={BUTTON_VARIANT.OUTLINED} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={BUTTON_VARIANT.CONTAINED}>Apply Filters</Button>
        </div>
      </React.Fragment>
    </Card>
  );
};
export default Filter;
