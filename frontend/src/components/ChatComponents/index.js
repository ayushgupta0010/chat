import React, { useState, useEffect } from "react";
import { GROUP_USER } from "../../utils/urls";
import axios from "axios";
import ContactList from "./Contacts";
import MessageBox from "./ChatArea";

const Chat = (props) => {
  const [contactList, setContactList] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [title, setTitle] = useState("");

  const user = props.match.params.user;

  useEffect(() => {
    const URL = `${GROUP_USER.LIST_BY_USER}/${user}`;
    axios
      .get(URL)
      .then((response) => setContactList(response.data))
      .catch((error) => error);
  }, [user]);

  return (
    <div className='layout overflow-hidden'>
      <ContactList data={{ contactList, setSelectedChat, setTitle }} />
      {selectedChat && selectedChat !== "" && (
        <MessageBox
          data={{ selectedChat, setSelectedChat, title, user, setContactList }}
        />
      )}
    </div>
  );
};

export default Chat;
