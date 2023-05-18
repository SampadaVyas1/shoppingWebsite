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
import {
  ARROW_ALIGNMENT,
  BUTTON_VARIANT,
  TOOLTIP_POSITION,
} from "@/common/types/enums";
import { IStartConversationModalProps } from "./startConversationModal.types";
import { addCandidate } from "@/common/dbUtils";
import { ICandidateListCardProps } from "../candidateListCard/candidateListCard.types";

const StartConversationModal = (props: IStartConversationModalProps) => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    ICandidateListCardProps[]
  >([]);

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
        <Candidates
          customScrollStyle={styles.candidateTable}
          hasOutsideData
          onSelect={onRowSelect}
        />
      ) : (
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
