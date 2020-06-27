import React from 'react';

const NavItem = ({ text, count, active, icon }) => (
  <a
    href='#'
    className={`nav-item flex items-center py-1 text-gray-600 font-medium transition duration-200 ease-in-out hover:text-gray-700 ${
      active && 'text-gray-800'
    }`}>
    <i className={`fas fa-${icon}`}></i>
    <span className='ml-3 mr-auto'>{text}</span>
    <span className='count'>{count}</span>
  </a>
);

export default NavItem;
