import Container from "@/components/container";
import Search from "@/components/searchBar";
import InfiniteScroll from "@/components/infiniteScroll";
import { TableComponent } from "@/components/table";
import techStacks from "./mockData.json";
import styles from "./techStacks.module.scss";
import React, { ChangeEvent, useState } from "react";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import { debounce } from "@/common/utils";
import EmptyState from "@/components/emptyState";

const tableHeader = [
  {
    id: 1,
    title: "Name",

    sort: true,
  },
  {
    id: 2,
    title: "Total Candidates",
    sort: false,
  },
  {
    id: 3,
    title: "Active Candidates",
    sort: false,
  },
];

const TechStacks = () => {
  const [techStackData, setTechStackData] = useState<any>(techStacks);
  const [searchValue, setSearchValue] = useState<string>("");
  const customStyle = {
    table: ({ ...props }) => {
      return <table {...props} className={styles.table} />;
    },
    header: {
      row: (props: React.HTMLAttributes<HTMLTableRowElement>[]) => (
        <tr {...props} className={styles.customHeaderStyle} />
      ),
    },
  };

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handlePageChange = () => {
    setTechStackData([...techStackData, ...techStacks]);
  };

  const clearSearch = () => {
    searchValue && setSearchValue("");
  };

  return (
    <Container customClass={styles.techStacks}>
      {!!techStackData.length ? (
        <React.Fragment>
          <InputBox
            endIcon={searchValue ? Images.close : Images.search}
            value={searchValue}
            onEndIconClick={clearSearch}
            onChange={handleSearch}
            customClass={styles.searchBox}
          />
          <InfiniteScroll
            nextPage={true}
            handlePageChange={handlePageChange}
            customClass={styles.scroll}
          >
            <TableComponent
              data={techStackData}
              columnHeaderTitle={tableHeader}
              // sortbuttonData={sortbuttonData}
              customStyle={customStyle}
              customRowStyling={styles.customRowStyling}
            />
          </InfiniteScroll>
        </React.Fragment>
      ) : (
        <EmptyState
          image={Images.techStackEmpty}
          title={`"Oops, it looks like tech stack details haven't been added yet!`}
        />
      )}
    </Container>
  );
};

export default TechStacks;
