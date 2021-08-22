import React, { useEffect, useState } from "react";
import { CHAT } from "../../utils/urls";
import axios from "axios";
import Title from "./Title";
import ChatList from "./ChatList";
import MsgInput from "./MsgInput";

const ChatArea = ({ data }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const URL = `${CHAT.LIST}/${data.selectedChat}`;
    axios
      .get(URL)
      .then((response) => setMessages(response.data))
      .catch((error) => error);
  }, [data.selectedChat]);

  return (
    <main className='main is-visible' data-dropzone-area=''>
      <div className='container h-100'>
        <div className='d-flex flex-column h-100 position-relative'>
          <Title
            src='https://firebasestorage.googleapis.com/v0/b/schoolible-f3e11.appspot.com/o/teacher1%2Fposts%2F1.jpg?alt=media&token=96df54ae-947b-45f4-a538-27ee0a574ea6'
            title={data.title}
            setSelectedChat={data.setSelectedChat}
          />
          <ChatList chats={messages} user={data.user} />
          <MsgInput
            user={data.user}
            group={data.selectedChat}
            setMessages={setMessages}
            setContactList={data.setContactList}
          />
        </div>
      </div>
    </main>
  );
};

export default ChatArea;
