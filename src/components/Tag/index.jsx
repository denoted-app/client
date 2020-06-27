import React from 'react';

const Tag = ({ id, text, showClose, handleTagsDelete }) => {
  if (showClose) {
    return (
      <button
        className='tag border border-gray-300 text-xs bg-white shadow-sm font-medium py-1 px-2 rounded-full align-middle transition duration-200 ease-in-out hover:shadow-lg hover:text-blue-800 focus:outline-none'
        key={id}>
        {text}
        <span
          className='close text-gray-500 hover:text-blue-600'
          onClick={() => handleTagsDelete(id)}>
          <i className='fas fa-times'></i>
        </span>
      </button>
    );
  } else {
    return (
      <span
        className='tag mt-2 text-xs bg-white shadow-sm font-medium py-1 px-2 rounded-full align-middle transition duration-200 ease-in-out hover:shadow-lg hover:text-blue-800 focus:outline-none'
        key={id}>
        {text}
      </span>
    );
  }
};
export default Tag;
