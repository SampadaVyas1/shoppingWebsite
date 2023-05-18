import React, { useState } from "react";
import Typography from "@/components/typography";
import Card from "@/components/card";
import ImageComponent from "@/components/imageComponent";
import MulitSelectCheckBOX from "./multiSelectCheckBox/index";
import Button from "@/components/button";
import Images from "@/public/assets/icons";
import styles from "./filterComponent.module.scss";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/types/enums";

const Filter = ({ onClose, filterData, onClick, filterList }: any) => {
  const [selectedFilter, setSelectedFilter] = useState<any>(null);
  const [options, setOptions] = useState();

  const [filters, setFilters] = useState<any>(filterList);
  const handleFilterClick = (filterData: any) => {
    if (filterData?.type == selectedFilter?.type) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filterData);
      setOptions(filterData.value);
    }
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
              {!!filterData &&
                filterData.map((filter: any, index: number) => {
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
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}
                      >
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
                  options={options!}
                  searchable
                  onSelect={(value) =>
                    setFilters((prevState: any) => ({
                      ...prevState,
                      [selectedFilter?.type]: value,
                    }))
                  }
                  customStyle={styles.techFilter}
                  selectedValues={filters[selectedFilter?.type]}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.filterFooter}>
          <Button variant={BUTTON_VARIANT.OUTLINED} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={BUTTON_VARIANT.CONTAINED}
            onClick={() => onClick(filters)}
          >
            Apply Filters
          </Button>
        </div>
      </React.Fragment>
    </Card>
  );
};
export default Filter;
