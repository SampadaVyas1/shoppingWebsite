import Typography from "@/components/typography";
import styles from "./messageFilter.module.scss";
import Card from "@/components/card";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import CustomCheckBox from "@/components/customCheckBox";
import { randomUUID } from "crypto";
import React, { useState } from "react";
import ImageComponent from "@/components/imageComponent";
import Images from "@/public/assets/icons";
import Button from "@/components/button";
import Select from "@/components/select";
import { techStackOptions } from "@/components/addForm/addForm.constants";
import MultiselectOptions from "@/components/select/multiselectOptions";

const MessageFilter = ({ onClose }: any) => {
  const [selectedFilter, setSelectedFilter] = useState<any>(null);
  const primaryFilters = [
    { type: "CANDIDATE_STATUS", name: "Candidate Status" },
    { type: "POSTING_TITLE", name: "Posting Title" },
    { type: "TECH_STACK", name: "Tech Stack" },
  ];

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
              <div className={styles.statusFilter}>
                <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>
                  Message Status
                </Typography>
                <div className={styles.filter}>
                  <CustomCheckBox label="Unread" id={"Unread"} />
                  <CustomCheckBox label="Failed" id={"Failed"} />
                </div>
              </div>
              {primaryFilters.map((filter, index: number) => {
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
                <MultiselectOptions
                  options={techStackOptions}
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
export default MessageFilter;
