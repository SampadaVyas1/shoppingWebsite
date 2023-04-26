import React from "react";
import { useEffect, useState } from "react";
import socket from "@/socket";
import { db } from "@/db";
import Button from "@/components/button";
import ImageComponent from "@/components/imageComponent";
import CandidateList from "./candidateList";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import MessageScreen from "./messageScreen";
import Tag from "@/components/tag";
import styles from "./messages.module.scss";
import Images from "@/public/assets/icons";
import candidateData from "./candidates.json";
import levelData from "../../helpers/levelsData.json";
import { SOCKET_CONSTANTS, SOCKET_ROUTES } from "@/common/socketConstants";
import { increaseUnreadCount, updateMessage } from "@/common/dbUtils";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import MessagePlaceholder from "@/public/assets/images/messagePlaceholder.svg";
import { ITagType } from "@/components/tag/tag.types";
import { IMessagesStates } from "./messages.types";
import { ICandidateListCardProps } from "./candidateListCard/candidateListCard.types";
import { useAppSelector } from "@/redux/hooks";

const Messages = () => {
  const [messagePageState, setMessagePageState] = useState<IMessagesStates>({
    selectedCandidate: {} as ICandidateListCardProps,
    selectedLevels: [],
    isConnected: false,
    searchValue: "",
  });
  const { phone } = useAppSelector((state) => state.messages);
  const { selectedLevels, selectedCandidate, isConnected, searchValue } =
    messagePageState;

  const handleCandidateSelect = (candidate: any) => {
    setMessagePageState((prevState) => ({
      ...prevState,
      selectedCandidate: candidate,
    }));
  };
  const handleTagSelect = (tag: ITagType) => {
    const isSelected = selectedLevels.length && selectedLevels.includes(tag);

    setMessagePageState((prevState) => ({
      ...prevState,
      selectedLevels: isSelected
        ? selectedLevels.filter((levels) => levels.id !== tag.id)
        : [...selectedLevels, tag],
    }));
  };

  const handleSearch = (event: any) => {
    setMessagePageState((prevState) => ({
      ...prevState,
      searchValue: event.target.value,
    }));
  };

  const handleClearSearch = () => {
    searchValue &&
      setMessagePageState((prevState) => ({
        ...prevState,
        searchValue: "",
      }));
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit(SOCKET_ROUTES.CREDENTIALS, {
        phoneId: SOCKET_CONSTANTS.PHONE_ID,
        userId: SOCKET_CONSTANTS.USER_ID,
      });

      socket.on(SOCKET_ROUTES.CONNECT, () => {
        socket.emit(SOCKET_ROUTES.CREDENTIALS, {
          phoneId: SOCKET_CONSTANTS.PHONE_ID,
          userId: SOCKET_CONSTANTS.USER_ID,
        });
        setMessagePageState((prevState) => ({
          ...prevState,
          isConnected: true,
        }));
      });

      socket.on(SOCKET_ROUTES.DISCONNECT, () => {
        console.log("disconnect");
        setMessagePageState((prevState) => ({
          ...prevState,
          isConnected: false,
        }));
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
      if (matchedResult) {
        console.log(matchedResult, data.status);
        await updateMessage({ ...matchedResult, status: data.status });
      }
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
      await increaseUnreadCount(from, phone);
      await updateMessage({ ...newMessage, phone: from });
    });
  }, [phone]);

  return (
    <div className={styles.messagesPage}>
      <div className={styles.candidateList}>
        <div className={styles.searchBar}>
          <InputBox
            endIcon={searchValue ? Images.crossIconBlack : Images.search}
            placeholder="Search..."
            value={searchValue}
            onEndIconClick={handleClearSearch}
            onChange={handleSearch}
          />
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
        {!selectedCandidate?.mobile ? (
          <ImageComponent
            src={MessagePlaceholder}
            customClass={styles.messagePlaceholder}
          />
        ) : (
          <MessageScreen
            candidateData={selectedCandidate}
            userId={SOCKET_CONSTANTS.USER_ID}
            isConnected={isConnected}
          />
        )}
      </div>
    </div>
  );
};
export default Messages;
