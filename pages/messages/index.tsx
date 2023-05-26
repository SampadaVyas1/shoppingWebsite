import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { useDispatch } from "react-redux";
import { useLiveQuery } from "dexie-react-hooks";
import { IMessage, db } from "@/db";
import Image from "next/image";
import socket from "@/socket";
import Button from "@/components/button";
import ImageComponent from "@/components/imageComponent";
import CandidateList from "../../pageComponents/messages/candidateList";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import Tag from "@/components/tag";
import TransitionWrapper from "@/components/transitionWrapper";
import MessageScreen from "@/pageComponents/messages/messageScreen";
import Modal from "@/components/modal";
import StartConversationModal from "@/pageComponents/messages/startConversationModal";
import styles from "./messages.module.scss";
import Images from "@/public/assets/icons";
import {
  SOCKET_CONSTANTS,
  SOCKET_ROUTES,
} from "@/common/constants/socketConstants";
import {
  getAllConversations,
  getFilteredData,
  getMessageFromMessageId,
  increaseUnreadCount,
  updateMessage,
} from "@/common/utils/dbUtils";
import {
  ARROW_ALIGNMENT,
  BUTTON_VARIANT,
  MESSAGE_TYPES,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/types/enums";
import MessagePlaceholder from "@/public/assets/images/messagePlaceholder.svg";
import { ITagType } from "@/components/tag/tag.types";
import {
  IIncomingMessageType,
  IMessagesStates,
} from "../../common/types/messages.types";
import { useAppSelector } from "@/redux/hooks";
import { ICandidateListCardProps } from "@/pageComponents/messages/candidateListCard/candidateListCard.types";
import { getDataFromSessionStorage } from "@/common/utils";
import EmptyState from "@/components/emptyState";
import { IData } from "@/common/types/candidates.types";
import { sagaActions } from "@/redux/actions";

const Messages = () => {
  const [messagePageState, setMessagePageState] = useState<IMessagesStates>({
    selectedCandidate: {} as ICandidateListCardProps,
    selectedLevels: [],
    isConnected: false,
    searchValue: "",
    isFilterOpen: false,
    isAddModalOpen: false,
  });

  const [conversationList, setConversationList] = useState<
    IMessage[] | undefined
  >(undefined);
  const conversations = useLiveQuery(() => {
    return getAllConversations();
  });

  const dispatch = useDispatch();

  const { employeeId } = useAppSelector((state) => state.login.userDetails);
  const { phone } = useAppSelector((state) => state.messages);
  const {
    selectedLevels,
    selectedCandidate,
    isConnected,
    searchValue,
    isAddModalOpen,
  } = messagePageState;

  const handleCandidateSelect = (candidate: IData) => {
    setMessagePageState((prevState) => ({
      ...prevState,
      selectedCandidate: candidate,
    }));
  };

  const closeFilter = () => {
    setMessagePageState((prevState) => ({
      ...prevState,
      isFilterOpen: false,
    }));
  };

  const toggleFilter = (event: any) => {
    event.stopPropagation();
    setMessagePageState((prevState) => ({
      ...prevState,
      isFilterOpen: !prevState.isFilterOpen,
    }));
  };

  const handleTagSelect = (tag: ITagType) => {
    const isSelected =
      selectedLevels.length &&
      selectedLevels.filter((level) => level.id === tag.id).length;
    const updatedTags = isSelected
      ? selectedLevels.filter((levels) => levels.id !== tag.id)
      : [...selectedLevels, tag];

    updateConversationList(
      searchValue,
      updatedTags.map((tag) => tag.label)
    );
    setMessagePageState((prevState) => ({
      ...prevState,
      selectedLevels: updatedTags,
    }));
  };

  const handleSearch = (event: any) => {
    setMessagePageState((prevState) => ({
      ...prevState,
      searchValue: event.target.value,
    }));
    updateConversationList(event.target.value);
  };

  const updateConversationList = async (
    searchKey: string,
    levels: string[] = []
  ) => {
    const result = await getFilteredData(searchKey, levels);
    setConversationList(result);
  };

  const handleClearSearch = () => {
    searchValue &&
      setMessagePageState((prevState) => ({
        ...prevState,
        searchValue: "",
      }));
    updateConversationList("");
  };

  const handleAddModalClose = () => {
    setMessagePageState((prevState) => ({
      ...prevState,
      isAddModalOpen: !isAddModalOpen,
    }));
  };

  const handleAddCandidate = (selectedCandidate: IData[]) => {
    const [firstCandidate, ...otherCandidates] = selectedCandidate ?? [];
    selectedCandidate?.length === 1 && handleCandidateSelect(firstCandidate);
  };

  const createNewMessage = (singleMessage: IIncomingMessageType) => {
    const {
      from,
      wamid,
      messageType,
      timestamp,
      message,
      mediaUrl,
      caption,
      fileName,
    } = singleMessage;
    const newMessage = {
      messageId: wamid,
      message: message,
      timestamp: timestamp,
      messageType: messageType,
      mediaUrl: mediaUrl,
      to: `${employeeId}`,
      caption: caption,
      fileName: fileName,
      from: from,
    };
    return newMessage;
  };

  const getNotificationsFromSocket = () => {
    socket.on(
      SOCKET_ROUTES.NOTIFICATION,
      async (data: IIncomingMessageType) => {
        const { from, wamid } = data;
        const newMessage = createNewMessage(data);
        !phone ||
          (from !== phone && (await increaseUnreadCount(from, wamid, false)));
        await updateMessage({ ...newMessage, phone: from });
      }
    );
  };

  const getPendingMessages = () => {
    socket.on(SOCKET_ROUTES.PENDING_MESSAGES, async (data: any) => {
      const messageTypes = [
        MESSAGE_TYPES.TEXT,
        MESSAGE_TYPES.DOCUMENT,
        MESSAGE_TYPES.IMAGE,
      ];

      Promise.all(
        data.map(async (singleMessage: IIncomingMessageType) => {
          const { from, wamid } = singleMessage;
          const newMessage = createNewMessage(singleMessage);
          if (
            messageTypes.includes(singleMessage?.messageType as MESSAGE_TYPES)
          ) {
            await increaseUnreadCount(from, wamid, true);
            await updateMessage({ ...newMessage, phone: from });
          }
        })
      );
    });
  };

  const getPendingStatus = () => {
    socket.on(SOCKET_ROUTES.PENDING_STATUS, async (data: any) => {
      if (data.length) {
        Promise.all(
          data.map(async (pendingStatus: any) => {
            const matchedResult = await getMessageFromMessageId(
              pendingStatus.id
            );
            if (matchedResult) {
              await updateMessage({
                ...matchedResult,
                status: pendingStatus.status,
              });
            }
          })
        );
      }
    });
  };

  const getStatus = () => {
    socket.on(SOCKET_ROUTES.STATUS, async (data: any) => {
      const matchedResult = await getMessageFromMessageId(data.id);
      if (matchedResult) {
        await updateMessage({ ...matchedResult, status: data.status });
      }
    });
  };

  const connectSocket = () => {
    socket.connect();
    socket.emit(SOCKET_ROUTES.CREDENTIALS, {
      phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
      userId: `${employeeId}`,
    });

    socket.on(SOCKET_ROUTES.CONNECT, () => {
      socket.emit(SOCKET_ROUTES.CREDENTIALS, {
        phoneId: `${process.env.NEXT_PUBLIC_PHONE_ID}`,
        userId: `${employeeId}`,
      });
      setMessagePageState((prevState) => ({
        ...prevState,
        isConnected: true,
      }));
    });

    socket.on(SOCKET_ROUTES.DISCONNECT, () => {
      setMessagePageState((prevState) => ({
        ...prevState,
        isConnected: false,
      }));
    });
  };

  useEffect(() => {
    if (!socket.connected && employeeId) {
      connectSocket();
    }
    getStatus();
    getPendingStatus();
    getPendingMessages();
    getNotificationsFromSocket();
  }, [employeeId]);

  useEffect(() => {
    dispatch({ type: sagaActions.GET_CANDIDATE_FILTER });
    dispatch({ type: sagaActions.BACKUP_CHATS });
  }, []);

  useEffect(() => {
    setConversationList(conversations);
  }, [conversations]);

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
        {/* TO BE ADDED LATER */}
        {/* <div className={styles.searchFilter}>
          <div className={styles.levelFilter}>
            {!!interviewLevel &&
              interviewLevel.map((levels: string, index: number) => (
                <Tag
                  tagValue={{ id: `${index}`, label: levels }}
                  active={
                    !!selectedLevels.filter((level) => level.id === `${index}`)
                      .length
                  }
                  onClick={() =>
                    handleTagSelect({ id: `${index}`, label: levels })
                  }
                  key={index}
                />
              ))}
          </div>
          <Popover
            isOpen={true}
            positions={[TOOLTIP_POSITION.BOTTOM, TOOLTIP_POSITION.RIGHT]}
            reposition={true}
            align={ARROW_ALIGNMENT.START}
            onClickOutside={closeFilter}
            padding={16}
            content={
              <TransitionWrapper open={messagePageState.isFilterOpen}>
                <MessageFilter onClose={closeFilter} />
              </TransitionWrapper>
            }
          >
            <Image
              src={Images.filterIcon}
              onClick={toggleFilter}
              alt="filter"
              className={styles.filter}
            />
          </Popover>
        </div> */}

        {!conversationList || conversationList?.length ? (
          <CandidateList
            candidateData={conversationList as ICandidateListCardProps[]}
            selectedData={selectedCandidate}
            onSelect={handleCandidateSelect}
            isLoading={!conversationList}
          />
        ) : (
          <div className={styles.emptyCandidateList}>
            <EmptyState
              title={"No message yet"}
              subTitle={
                "click on the “+” button to start messaging a candidate"
              }
              image={Images.noCandidates}
              customImageStyle={styles.noCandidateImage}
            />
          </div>
        )}
        <Button
          startIcon={Images.plusIcon}
          variant={BUTTON_VARIANT.CONTAINED}
          customStyle={styles.plusIcon}
          onClick={handleAddModalClose}
        />
      </div>
      <div className={styles.messageScreen}>
        {!selectedCandidate?.id ? (
          <ImageComponent
            src={MessagePlaceholder}
            customClass={styles.messagePlaceholder}
          />
        ) : (
          <MessageScreen
            candidateData={selectedCandidate}
            userId={`${employeeId}`}
            recruiterName={`${selectedCandidate?.recruiterFirstName} ${selectedCandidate?.recruiterLastName}`}
            isConnected={isConnected}
          />
        )}
      </div>

      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        header="Start a new conversation with"
        showCloseIcon
        customStyle={styles.startModal}
      >
        <StartConversationModal
          handleClose={handleAddModalClose}
          onCandidateSelect={handleAddCandidate}
        />
      </Modal>
    </div>
  );
};
export default Messages;
