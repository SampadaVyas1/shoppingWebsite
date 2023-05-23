import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import TipContainer from "@/components/tipContainer";
import Typography from "@/components/typography";
import ImageComponent from "@/components/imageComponent";
import Tag from "@/components/tag";
import Modal from "@/components/modal";
import InfiniteScroll from "@/components/infiniteScroll";
import Loader from "@/components/loader";
import Images from "@/public/assets/icons";
import styles from "./chatBody.module.scss";
import { IChatBodyProps } from "./chatBody.types";
import { ISentMessage } from "@/common/types";
import {
  formatTime,
  getCurrentDay,
  getStatusImage,
  isSameDay,
  setDataInSessionStorage,
} from "@/common/utils";
import {
  MESSAGE_STATUS,
  MESSAGE_TYPES,
  TOOLTIP_POSITION,
  TYPOGRAPHY_VARIANT,
} from "@/common/types/enums";
import {
  MESSAGE_STATUS_VARIANT,
  SOCKET_CONSTANTS,
} from "@/common/socketConstants";
import { sortMessageByTime } from "@/common/utils/dbUtils";
import ChatList from "./chatsList";

const ChatBody = (props: IChatBodyProps) => {
  const { phone, onRetry } = props;
  const [selectedImage, setSelectedImage] = useState<string | File>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messageListData = useLiveQuery(() => {
    return db.messages
      .where(SOCKET_CONSTANTS.PHONE)
      .equals(phone)
      .sortBy("timestamp");
  });

  const [chats, setChats] = useState<ISentMessage[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleModalClose = () => {
    setSelectedImage("");
  };

  const handleScroll = async (
    scrollTop: number,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    await loadMoreChats(25);
    ref.current &&
      ref.current.scrollTo({
        top: 200,
        behavior: "smooth",
      });
  };

  const handleMediaDownload = useCallback((mediaUrl: string) => {
    window.open(mediaUrl, "_blank", "noreferrer");
  }, []);

  const loadMoreChats = async (batchSize: number) => {
    setIsLoading(true);
    const messageCollection = await db.messages
      .where(SOCKET_CONSTANTS.PHONE)
      .equals(phone)
      .sortBy("timestamp");
    const messages = await messageCollection;
    const nextMessages = messages.slice(-(chats.length + batchSize));
    setChats(nextMessages);
    setIsLoading(false);
  };

  const getMediaUrl = (media: string | File) => {
    return typeof media !== "string" ? URL.createObjectURL(media) : media;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageListData, messagesEndRef]);

  useEffect(() => {
    const print = async () => {
      const messageCollection = await sortMessageByTime(phone);
      const messages = await messageCollection;
      setChats(messages.slice(-25));
    };
    print();
  }, [phone, messageListData]);

  useEffect(() => {
    setDataInSessionStorage(SOCKET_CONSTANTS.PHONE, phone);
    return () => setDataInSessionStorage(SOCKET_CONSTANTS.PHONE, "");
  }, [phone]);

  return (
    <InfiniteScroll
      customClass={styles.messageBody}
      reverseScroll
      nextPage={!!messageListData && chats.length < messageListData?.length}
      onReversePageChange={handleScroll}
    >
      {isLoading && <Loader customStyles={styles.chatLoader} />}
      {!!chats && (
        <ChatList
          chats={chats}
          onRetry={onRetry}
          handleMediaDownload={handleMediaDownload}
          setSelectedImage={setSelectedImage}
        />
      )}
      <div ref={messagesEndRef}></div>
      <Modal
        open={!!selectedImage.length}
        onClose={handleModalClose}
        showCloseIcon
        header="Preview"
        customStyle={styles.previewModal}
      >
        {!!selectedImage && (
          <ImageComponent
            src={selectedImage.toString()}
            customClass={styles.imagePreview}
          />
        )}
      </Modal>
    </InfiniteScroll>
  );
};
export default ChatBody;
