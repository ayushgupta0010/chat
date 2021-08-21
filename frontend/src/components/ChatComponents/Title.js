import React from "react";
import { Link } from "react-router-dom";

const Title = ({ src, title, setSelectedChat }) => (
  <div className='chat-header border-bottom py-4 py-lg-7'>
    <div className='row align-items-center'>
      <div className='col-2 d-xl-none'>
        <Link
          to='#'
          className='icon icon-lg text-muted'
          data-toggle-chat=''
          onClick={(e) => setSelectedChat("")}>
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
            className='feather feather-chevron-left'>
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </Link>
      </div>
      <div className='col-8 col-xl-12'>
        <div className='row align-items-center text-center text-xl-start'>
          <div className='col-12 col-xl-6'>
            <div className='row align-items-center gx-5'>
              <div className='col-auto'>
                <div className='avatar d-none d-xl-inline-block'>
                  <img
                    className='avatar-img'
                    style={{ width: "50px", height: "50px" }}
                    src={src}
                    alt='user'
                  />
                </div>
              </div>
              <div className='col overflow-hidden'>
                <h6 className='text-truncate'>{title}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Title;
