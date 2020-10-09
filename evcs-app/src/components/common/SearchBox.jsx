import React from 'react';

const SearchBox = ({ value, className, placeholder, onChange }) => {
  return (
    <input
      autoFocus
      type='text'
      name='query'
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      className={`${className} form-control my-3`} />
  );
}

export default SearchBox;