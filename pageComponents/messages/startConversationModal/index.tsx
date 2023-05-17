import { useState } from "react";
import { Popover } from "react-tiny-popover";
import EmptyState from "@/components/emptyState";
import Image from "next/image";
import styles from "./startConversationModal.module.scss";
import Images from "@/public/assets/icons";
import Container from "@/components/container";
import InputBox from "@/components/inputBox";
import TransitionWrapper from "@/components/transitionWrapper";
import MessageFilter from "../messageFilter";
import Button from "@/components/button";
import Candidates from "@/pages/candidates";
import { BUTTON_VARIANT, TOOLTIP_POSITION } from "@/common/enums";
import { IStartConversationModalProps } from "./startConversationModal.types";
import { addCandidate } from "@/common/dbUtils";
import { ICandidateListCardProps } from "../candidateListCard/candidateListCard.types";

const StartConversationModal = (props: IStartConversationModalProps) => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    ICandidateListCardProps[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleClearSearch = () => {
    searchValue && setSearchValue("");
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleStartConversation = async () => {
    const updatedData = await Promise.all(
      selectedCandidates?.map(async (candidate) => {
        return await addCandidate(candidate);
      })
    );
    props.onCandidateSelect && props.onCandidateSelect(updatedData);
    props.handleClose();
  };

  const onRowSelect = (value: any[]) => {
    setSelectedCandidates(value);
  };

  return (
    <div className={styles.startModal}>
      {!props.candidateList ? (
        // <Container customClass={styles.header}>
        //   <InputBox
        //     endIcon={searchValue ? Images.crossIconBlack : Images.search}
        //     placeholder="Search..."
        //     value={searchValue}
        //     customClass={styles.search}
        //     onEndIconClick={handleClearSearch}
        //     onChange={handleSearch}
        //   />
        //   <Popover
        //     isOpen={true}
        //     positions={[TOOLTIP_POSITION.BOTTOM, TOOLTIP_POSITION.RIGHT]}
        //     reposition={true}
        //     align="start"
        //     onClickOutside={closeFilter}
        //     padding={16}
        //     content={
        //       <TransitionWrapper open={isFilterOpen}>
        //         <MessageFilter onClose={closeFilter} />
        //       </TransitionWrapper>
        //     }
        //   >
        //     <Image
        //       src={Images.filterIcon}
        //       onClick={toggleFilter}
        //       alt="filter"
        //       className={styles.filter}
        //     />
        //   </Popover>
        <Candidates
          customScrollStyle={styles.candidateTable}
          hasOutsideData
          onSelect={onRowSelect}
        />
      ) : (
        // </Container>
        <EmptyState
          title="Oops! No candidate Found"
          image={Images.noCandidate}
          subTitle=" It looks like you haven't added any candidates yet. You can start by searching for candidates using the search bar above. Once you've searched the  candidates, you can select them and send a bulk message by clicking the 'Submit' button. Happy recruiting!"
        />
      )}
      <Container customClass={styles.footer}>
        <Button variant={BUTTON_VARIANT.OUTLINED} onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          variant={BUTTON_VARIANT.CONTAINED}
          disabled={!selectedCandidates.length}
          onClick={handleStartConversation}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default StartConversationModal;
