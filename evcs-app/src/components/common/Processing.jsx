import React from 'react';

const Processing = () => {
  return (
    <>
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div><span className="pl-3">Processing, please wait ...</span>
    </>
  );
}

export default Processing;