import React, { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import FileModal from "./FileModal";

const MsgInput = ({ user, group, setMessages, setContactList }) => {
  const [message, setMessage] = useState("");

  const websocket = useRef(null);

  const handleModal = (e) => {
    const elem = document.getElementsByClassName("modal-backdrop");
    for (var i = 0; i < elem.length; i++)
      elem[i].classList.remove("modal-backdrop");
  };

  const handleFileInput = (e) => {
    var data = {
      type: "chat_message",
      sender: user,
      group,
      message: "",
      msg_type: e.target.name,
    };
    for (var i = 0; i < e.target.files.length; i++) {
      data.files = { ...data.files, [e.target.files[i].name]: "test" };
    }
    websocket.current.send(JSON.stringify(data));
    document.getElementById(`${e.target.name}-input`).value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      const data = {
        type: "chat_message",
        sender: user,
        group,
        message,
        msg_type: "text",
        files: "",
      };
      websocket.current.send(JSON.stringify(data));
      setMessage("");
    }
  };

  useEffect(() => {
    const path = `ws://localhost:8000/ws/chat/${group}/`;
    websocket.current = new ReconnectingWebSocket(path);

    websocket.current.onmessage = (message) => {
      const msg = JSON.parse(message.data);
      setMessages((original) => [...original, msg]);
      setContactList((original) =>
        original.map((x) => (x.group === group ? { ...x, last: msg } : x))
      );
    };

    return () => websocket.current.close();
  }, [group, setContactList, setMessages]);

  return (
    <div className='chat-footer pb-3 pb-lg-7 position-absolute bottom-0 start-0'>
      <form className='chat-form rounded-pill bg-dark' onSubmit={handleSubmit}>
        <div className='row align-items-center gx-0'>
          <div className='col-auto'>
            <button
              to='#'
              type='button'
              data-bs-toggle='modal'
              data-bs-target='#modal-profile'
              className='btn btn-icon btn-link text-body rounded-circle'
              onClick={handleModal}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-paperclip'>
                <path d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48' />
              </svg>
            </button>
          </div>
          <div className='col'>
            <div className='input-group'>
              <textarea
                className='form-control px-5'
                placeholder='Type your message...'
                rows='1'
                data-autosize='true'
                style={{
                  overflow: "hidden",
                  overflowWrap: "break-word",
                  resize: "none",
                  height: "46px",
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className='col-auto'>
            <button
              className='btn btn-icon btn-primary rounded-circle ms-5'
              type='submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-send'>
                <line x1='22' y1='2' x2='11' y2='13' />
                <polygon points='22 2 15 22 11 13 2 9 22 2' />
              </svg>
            </button>
          </div>
        </div>
      </form>
      <FileModal />
      <input
        type='file'
        accept='audio/*'
        id='audio-input'
        name='audio'
        multiple
        hidden
        onChange={handleFileInput}
      />
      <input
        type='file'
        accept='all'
        id='document-input'
        name='document'
        multiple
        hidden
        onChange={handleFileInput}
      />
      <input
        type='file'
        accept='image/*'
        id='image-input'
        name='image'
        multiple
        hidden
        onChange={handleFileInput}
      />
      <input
        type='file'
        accept='video/*'
        id='video-input'
        name='video'
        multiple
        hidden
        onChange={handleFileInput}
      />
    </div>
  );
};

export default MsgInput;
