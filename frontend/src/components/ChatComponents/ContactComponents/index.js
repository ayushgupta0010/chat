import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";

const Contacts = ({ data }) => {
  const [search, setSearch] = useState("");

  const websocket = useRef(null);

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

  const getFilteredUsers = (userList) =>
    userList.filter((user) =>
      Object.values(user).some((s) => ("" + s).toLowerCase().includes(search))
    );

  const LoadContacts = () =>
    getFilteredUsers(data.contactList).map((contact, i) => {
      var message;
      if (contact.last.msg_type === "text") message = contact.last.message;
      else if (contact.last.msg_type === "audio") message = "<audio>";
      else if (contact.last.msg_type === "document") message = "<document>";
      else if (contact.last.msg_type === "image") message = "<image>";
      else message = "<video>";

      return (
        <Link
          to='#'
          key={i}
          className='card border-0 text-reset'
          onClick={(e) => {
            data.setSelectedChat(contact.group);
            data.setTitle(contact.display_name);
          }}>
          <div className='card-body'>
            <div className='row gx-5'>
              <div className='col-auto'>
                <div className='avatar'>
                  <img
                    src='https://firebasestorage.googleapis.com/v0/b/schoolible-f3e11.appspot.com/o/teacher1%2Fposts%2F1.jpg?alt=media&token=96df54ae-947b-45f4-a538-27ee0a574ea6'
                    alt='user'
                    className='avatar-img'
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
              </div>

              <div className='col'>
                <div className='d-flex align-items-center mb-3'>
                  <h6 className='me-auto mb-0'>{contact.display_name}</h6>
                  <span className='text-muted extra-small ms-2'>
                    {contact.last.timestamp &&
                      getTimestamp(contact.last.timestamp)}
                  </span>
                </div>

                <div className='d-flex align-items-center'>
                  <div className='line-clamp me-auto'>
                    {contact.last.sender && (
                      <span>
                        {contact.last.sender}: {message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });

  useEffect(() => {
    const path = `ws://localhost:8000/ws/contact/${data.user}/`;
    websocket.current = new ReconnectingWebSocket(path);

    websocket.current.onmessage = (e) => {
      const contact = JSON.parse(e.data);
      data.setContactList((original) => [...original, contact]);
    };

    return () => websocket.current.close();
  });

  return (
    <aside className='sidebar bg-light'>
      <div className='fade h-100 show active' role='tabpanel'>
        <div className='d-flex flex-column h-100 position-relative'>
          <div className='hide-scrollbar'>
            <div className='container py-8'>
              <div className='mb-8'>
                <h2 className='fw-bold ms-3'>Chats</h2>
              </div>
              <div className='mb-6'>
                <div className='input-group'>
                  <div className='input-group-text'>
                    <div className='icon icon-lg'>
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
                        className='feather feather-search'>
                        <circle cx='11' cy='11' r='8'></circle>
                        <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                      </svg>
                    </div>
                  </div>
                  <input
                    type='text'
                    className='form-control form-control-lg ps-0'
                    placeholder='Search users'
                    aria-label='Search for users...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className='card-list'>
                <LoadContacts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Contacts;
