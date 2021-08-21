import React from "react";
import { Link } from "react-router-dom";

const getDate = (d) => {
  const date = new Date(d);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
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
                <div className='message-text'>
                  <p>{msg.message}</p>
                </div>
              </div>
              <div className='message-footer'>
                <span className='extra-small text-muted'>
                  {getDate(msg.timestamp)}
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
    </div>
  );
};

export default ChatList;