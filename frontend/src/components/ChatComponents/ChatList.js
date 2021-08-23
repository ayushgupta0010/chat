import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Audio from "./Audio";
import Document from "./Document";
import Image from "./Image";
import Video from "./Video";

const getTimestamp = (d) =>
  new Date(d).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const linkifyMessage = (text) => {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gi;
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" class="text-secondary" target="_blank">${url}</a>`
  );
};

const ChatList = ({ chats, user }) => {
  const LoadChatList = () =>
    chats.map((msg, i) => {
      const classList = msg.sender === user ? "message message-out" : "message";
      return (
        <div className={classList} key={i}>
          <Link to='#' className='avatar avatar-responsive'>
            <img
              style={{ width: "50px", height: "50px" }}
              className='avatar-img'
              src='https://firebasestorage.googleapis.com/v0/b/schoolible-f3e11.appspot.com/o/teacher1%2Fposts%2F1.jpg?alt=media&token=96df54ae-947b-45f4-a538-27ee0a574ea6'
              alt='user'
            />
          </Link>
          <div className='message-inner'>
            <div className='message-body'>
              <div className='message-content'>
                {msg.msg_type === "text" && (
                  <div className='message-text'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: linkifyMessage(msg.message),
                      }}
                    />
                  </div>
                )}
                {msg.msg_type === "audio" && <Audio files={msg.files} />}
                {msg.msg_type === "document" && <Document files={msg.files} />}
                {msg.msg_type === "image" && <Image files={msg.files} />}
                {msg.msg_type === "video" && <Video files={msg.files} />}
              </div>
              <div className='message-footer'>
                <span className='extra-small text-muted'>
                  {getTimestamp(msg.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className='chat-body hide-scrollbar flex-1 h-100'>
      <div className='chat-body-inner' style={{ paddingBottom: "87px" }}>
        <div className='py-6 py-lg-12'>
          <LoadChatList />
        </div>
      </div>
      <AlwaysScrollToBottom />
    </div>
  );
};

export default ChatList;
