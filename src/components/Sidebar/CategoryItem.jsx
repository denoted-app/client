import React from 'react';

const CategoryItem = ({ text, count, color }) => (
  <a
    href='#'
    className='sidebar-item flex items-center py-1 text-gray-600 font-medium transition duration-200 ease-in-out hover:text-gray-700'>
    <span className={`w-2 h-2 bg-${color}-400 rounded-full`}></span>
    <span className='ml-3 mr-auto'>{text}</span>
    <span className='count'>{count}</span>
  </a>
);

export default CategoryItem;
