import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import ImageComponent from "@/components/imageComponent";
import Modal from "@/components/modal";
import InfiniteScroll from "@/components/infiniteScroll";
import Loader from "@/components/loader";
import styles from "./chatBody.module.scss";
import { IChatBodyProps } from "./chatBody.types";
import { ISentMessage } from "@/common/types";
import { SOCKET_CONSTANTS } from "@/common/constants/socketConstants";
import { getSortedMessages, sortMessageByTime } from "@/common/utils/dbUtils";
import ChatList from "./chatsList";
import { useDispatch } from "react-redux";
import { setPhone } from "@/redux/slices/messageSlice";
import { TIMESTAMP } from "@/common/constants";

const ChatBody = (props: IChatBodyProps) => {
  const { phone, onRetry } = props;
  const [selectedImage, setSelectedImage] = useState<string | File>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const messageListData = useLiveQuery(() => {
    return getSortedMessages(phone);
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
      .sortBy(TIMESTAMP);
    const messages = await messageCollection;
    const nextMessages = messages.slice(-(chats.length + batchSize));
    setChats(nextMessages);
    setIsLoading(false);
  };

  const getInitialChats = async () => {
    const messageCollection = await sortMessageByTime(phone);
    const messages = await messageCollection;
    setChats(messages.slice(-25));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageListData, messagesEndRef]);

  useEffect(() => {
    getInitialChats();
  }, [phone, messageListData, props.isLoading]);

  useEffect(() => {
    dispatch(setPhone(phone));
    return () => {
      dispatch(setPhone(""));
    };
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
