import React from "react";

const ImgFile = ({ files }) => {
  const LoadImg = () =>
    files.map((x, i) => (
      <div className='col' key={i}>
        <img
          className='img-fluid rounded'
          src={x}
          data-action='zoom'
          alt='user'
        />
      </div>
    ));

  return (
    <div className='message-gallery'>
      <div className='row gx-3'>
        <LoadImg />
      </div>
    </div>
  );
};

export default ImgFile;
