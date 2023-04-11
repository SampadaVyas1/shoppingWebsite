import {
  BUTTON_VARIANT,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/enums";
import Button from "@/components/button";
import ImageComponent from "@/components/image";
import Tooltip from "@/components/tooltip";
import styles from "./messages.module.scss";
import MessagePlaceholder from "../../public/assets/images/messagePlaceholder.svg";
import Images from "@/public/assets/icons";
import candidateData from "./candidates.json";
import CandidateList from "./candidateList";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import { useEffect, useState } from "react";
import MessageScreen from "./messageScreen";
import React from "react";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import socket from "@/socket";

const Messages = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const handleCandidateSelect = (candidate: any) => {
    setSelectedCandidate(candidate);
  };

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit("credentials", { phoneId: "106886972321301" });

      socket.on("connect", () => {
        setIsConnected(true);
      });
      socket.on("disconnect", () => {
        console.log("disconnect");
        setIsConnected(false);
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={styles.messagesPage}>
      <div className={styles.candidateList}>
        <div className={styles.searchFilter}>
          <InputBox
            startIcon={Images.search}
            placeholder="Search"
            customClass={styles.searchBar}
          />
          <ImageComponent src={Images.filterIcon} customClass={styles.filter} />
        </div>
        {candidateData.length ? (
          <CandidateList
            candidateData={candidateData}
            selectedData={selectedCandidate}
            onSelect={handleCandidateSelect}
            isLoading={false}
          />
        ) : (
          <div className={styles.emptyCandidateList}>
            <ImageComponent
              src={Images.noCandidates}
              customClass={styles.noCandidateImage}
            />
            <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}>
              Empty candidate list
            </Typography>
            <Typography
              variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
              customStyle={styles.hint}
            >
              {` But don't worry - you can start adding candidates by clicking on the “+” button`}
            </Typography>
          </div>
        )}
        <Button
          startIcon={Images.plusIcon}
          variant={BUTTON_VARIANT.CONTAINED}
          customStyle={styles.plusIcon}
        ></Button>
      </div>
      <div className={styles.messageScreen}>
        {!selectedCandidate ? (
          <ImageComponent
            src={MessagePlaceholder}
            customClass={styles.messagePlaceholder}
          />
        ) : (
          <MessageScreen
            candidateData={selectedCandidate}
            isConnected={isConnected}
          />
        )}
      </div>
    </div>
  );
};
export default Messages;
