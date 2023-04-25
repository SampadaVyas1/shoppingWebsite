import {
  BUTTON_VARIANT,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/enums";
import Button from "@/components/button";
import ImageComponent from "@/components/imageComponent";
import Tooltip from "@/components/tooltip";
import styles from "./messages.module.scss";
import MessagePlaceholder from "../../public/assets/images/messagePlaceholder.svg";
import Images from "@/public/assets/icons";
import candidateData from "./candidates.json";
import levelData from "../../helpers/levelsData.json";
import CandidateList from "./candidateList";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import { useCallback, useEffect, useState } from "react";
import MessageScreen from "./messageScreen";
import React from "react";
import socket from "@/socket";
import { db } from "@/db";
import { SOCKET_ROUTES } from "@/common/socketConstants";
import {
  addMessage,
  increaseUnreadCount,
  updateMessage,
} from "@/common/dbUtils";
import Tag from "@/components/tag";
import { ITagType } from "@/components/tag/tag.types";

const Messages = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedLevels, setSelectedLevels] = useState<ITagType[]>([]);

  const handleCandidateSelect = (candidate: any) => {
    setSelectedCandidate(candidate);
  };
  const handleTagSelect = (tag: ITagType) => {
    console.log(selectedLevels);
    const isSelected = selectedLevels.length && selectedLevels.includes(tag);
    if (isSelected) {
      setSelectedLevels(
        selectedLevels.filter((levels) => levels.id !== tag.id)
      );
    } else {
      setSelectedLevels([...selectedLevels, tag]);
    }
  };

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit(SOCKET_ROUTES.CREDENTIALS, {
        phoneId: "106886972321301",
        userId: "11098",
      });

      socket.on(SOCKET_ROUTES.CONNECT, () => {
        socket.emit(SOCKET_ROUTES.CREDENTIALS, {
          phoneId: "106886972321301",
          userId: "11098",
        });
        setIsConnected(true);
      });

      socket.on(SOCKET_ROUTES.DISCONNECT, () => {
        console.log("disconnect");
        setIsConnected(false);
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on(SOCKET_ROUTES.STATUS, async (data: any) => {
      const matchedResult = await db.messages
        .where("messageId")
        .equals(data.id)
        .first();
      if (matchedResult)
        await updateMessage({ ...matchedResult, status: data.status });
    });
  }, []);

  useEffect(() => {
    socket.on(SOCKET_ROUTES.NOTIFICATION, async (data: any) => {
      const { from, wamid, messageType, timestamp, message } = data;
      const newMessage = {
        messageId: wamid,
        message: message,
        timestamp: timestamp,
        messageType: messageType,
        to: "11098",
        from: from,
      };
      await increaseUnreadCount(from);
      await updateMessage({ ...newMessage, phone: from });
    });
  }, []);

  return (
    <div className={styles.messagesPage}>
      <div className={styles.candidateList}>
        <div className={styles.searchBar}>
          <InputBox startIcon={Images.search} placeholder="Search" />
        </div>
        <div className={styles.searchFilter}>
          <div className={styles.levelFilter}>
            {levelData.map((levels, index) => (
              <Tag
                tagValue={{ id: levels.id, label: levels.label }}
                active={selectedLevels.includes(levels)}
                onClick={() => handleTagSelect(levels)}
                key={index}
              />
            ))}
          </div>
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
            userId="11098"
            isConnected={isConnected}
          />
        )}
      </div>
    </div>
  );
};
export default Messages;
