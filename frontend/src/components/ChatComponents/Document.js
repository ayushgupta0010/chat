import React from "react";
import { Link } from "react-router-dom";

const Document = ({ files }) =>
  Object.keys(files).map((x) => (
    <div className='message-text'>
      <div class='row align-items-center gx-4'>
        <div class='col-auto'>
          <Link to='#' class='avatar avatar-sm'>
            <div class='avatar-text bg-white text-primary'>
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
                class='feather feather-arrow-down'>
                <line x1='12' y1='5' x2='12' y2='19' />
                <polyline points='19 12 12 19 5 12' />
              </svg>
            </div>
          </Link>
        </div>
        <div class='col overflow-hidden'>
          <h6 class='text-truncate text-reset'>
            <Link to='#' class='text-reset'>
              {x}
            </Link>
          </h6>
        </div>
      </div>
    </div>
  ));

export default Document;
