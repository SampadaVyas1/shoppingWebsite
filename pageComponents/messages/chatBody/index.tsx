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
} from "@/common/enums";
import { MESSAGE_STATUS_VARIANT } from "@/common/socketConstants";
import { sortMessageByTime } from "@/common/dbUtils";

const ChatBody = (props: IChatBodyProps) => {
  const { phone, onRetry } = props;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messageListData = useLiveQuery(() => {
    return db.messages.where("phone").equals(phone).sortBy("timestamp");
  });

  const [chats, setChats] = useState<ISentMessage[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRetry = useCallback(
    (message: string, messageId: string) => () => {
      onRetry(message, messageId);
    },
    [onRetry]
  );

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
      .where("phone")
      .equals(phone)
      .sortBy("timestamp");
    const messages = await messageCollection;
    const nextMessages = messages.slice(-(chats.length + batchSize));
    setChats(nextMessages);
    setIsLoading(false);
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
    setDataInSessionStorage("phone", phone);
    return () => setDataInSessionStorage("phone", "");
  }, [phone]);

  return (
    <InfiniteScroll
      customClass={styles.messageBody}
      reverseScroll
      nextPage={!!messageListData && chats.length < messageListData?.length}
      onReversePageChange={handleScroll}
    >
      {isLoading && <Loader customStyles={styles.chatLoader} />}
      {!!chats &&
        chats?.map((messageData: ISentMessage, index: number) => {
          const {
            status,
            timestamp,
            message,
            messageId,
            caption,
            mediaUrl,
            messageType: type,
          } = messageData;
          const messageType = status
            ? MESSAGE_STATUS_VARIANT.SENT
            : MESSAGE_STATUS_VARIANT.RECEIVED;
          const icon = getStatusImage(status!);
          return (
            <React.Fragment key={index}>
              {!isSameDay(timestamp, chats[index - 1]?.timestamp) && (
                <div className={styles.date}>{getCurrentDay(timestamp)}</div>
              )}
              <TipContainer
                position={
                  messageData?.status
                    ? TOOLTIP_POSITION.RIGHT
                    : TOOLTIP_POSITION.LEFT
                }
                variant={messageType}
                customStyles={styles[messageType]}
              >
                <div className={styles.messageContent}>
                  {mediaUrl && type === "image" && (
                    <ImageComponent
                      src={
                        typeof mediaUrl !== "string"
                          ? URL.createObjectURL(mediaUrl)
                          : mediaUrl
                      }
                      onClick={() =>
                        setSelectedImage(
                          typeof mediaUrl !== "string"
                            ? URL.createObjectURL(mediaUrl)
                            : mediaUrl
                        )
                      }
                      fallbackText="Image"
                      customClass={styles.chatImage}
                      width={200}
                      height={200}
                    />
                  )}
                  {type === MESSAGE_TYPES.DOCUMENT &&
                    (typeof mediaUrl !== "string" ? (
                      <Tag
                        tagValue={{
                          id: "1",
                          label: mediaUrl?.name!,
                        }}
                      />
                    ) : (
                      <Tag
                        tagValue={{
                          id: "1",
                          label:
                            caption ||
                            mediaUrl!.substring(mediaUrl.lastIndexOf("/") + 1),
                        }}
                        onClick={() => handleMediaDownload(mediaUrl)}
                      />
                    ))}
                  <Typography
                    variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                    customStyle={styles.messageText}
                  >
                    {message}
                  </Typography>
                  {type !== "document" && (
                    <Typography
                      variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                      customStyle={styles.messageText}
                    >
                      {caption}
                    </Typography>
                  )}

                  <div className={styles.time}>
                    <Typography
                      variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
                      customStyle={styles.hint}
                    >
                      {formatTime(timestamp)}
                    </Typography>
                    {messageType !== MESSAGE_STATUS_VARIANT.RECEIVED &&
                      (messageData.status === MESSAGE_STATUS.SENDING ? (
                        <ImageComponent
                          src={Images.loaderSpinner}
                          className={styles.spinner}
                        />
                      ) : (
                        <ImageComponent
                          src={icon}
                          customClass={styles.icon}
                          width={20}
                          height={20}
                        />
                      ))}
                  </div>
                </div>
              </TipContainer>
              {status === MESSAGE_STATUS.FAILED && (
                <Typography
                  variant={TYPOGRAPHY_VARIANT.ERROR}
                  customStyle={styles.failedError}
                >
                  Failed to send.
                  <span
                    className={styles.retry}
                    onClick={handleRetry(message!, messageId)}
                  >
                    Tap to retry.
                  </span>
                </Typography>
              )}
            </React.Fragment>
          );
        })}
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
            src={selectedImage}
            customClass={styles.imagePreview}
          />
        )}
      </Modal>
    </InfiniteScroll>
  );
};
export default ChatBody;
