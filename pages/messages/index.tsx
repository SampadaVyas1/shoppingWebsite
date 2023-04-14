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
import socket from "@/socket";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import { ISentMessage } from "@/common/types";
import { SOCKET_ROUTES } from "@/common/socketConstants";
import { addMessage } from "@/common/dbUtils";

const Messages = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const handleCandidateSelect = (candidate: any) => {
    setSelectedCandidate(candidate);
  };

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const messageList = useLiveQuery(() => {
    return db.conversations.toArray();
  });

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit(SOCKET_ROUTES.CREDENTIALS, { phoneId: "106886972321301" });

      socket.on(SOCKET_ROUTES.CONNECT, () => {
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

  const updateStatus = async (
    phone: string,
    updatedMessage: ISentMessage[]
  ) => {
    const result = await db.conversations.where("id").equals(phone).first();
    if (result !== undefined) {
      try {
        await db?.conversations.put({ ...result, messages: updatedMessage });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.on(SOCKET_ROUTES.STATUS, async (data: any) => {
      const currentMessage = messageList?.find(
        (message) => message.id === data.recipient_id
      );

      const updatedStatus = currentMessage?.messages?.map((message) => {
        if (message.messageId === data.id) {
          return { ...message, status: data.status };
        }
        return message;
      });
      !!updatedStatus && (await updateStatus(data.recipient_id, updatedStatus));
    });
  }, [messageList]);

  useEffect(() => {
    socket.on("notification", async (data: any) => {
      const { from, wamid, messageType, timestamp, message } = data;
      const newMessage = {
        messageId: wamid,
        message: message,
        timestamp: timestamp,
        messageType: messageType,
        to: "11098",
        from: from,
      };
      addMessage(newMessage, from);
    });
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
            userId="11098"
            isConnected={isConnected}
          />
        )}
      </div>
    </div>
  );
};
export default Messages;
