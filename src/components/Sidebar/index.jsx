import React from 'react';
import Navigation from './Navigation';
import Categories from './Categories';

const Sidebar = ({ notesCount }) => (
  <div className='sidebar max-w-md flex flex-col p-5 bg-gray-100 border-r border-gray-300'>
    <h5>Note-Taking</h5>
    <Navigation notesCount={notesCount} />
    <Categories />
  </div>
);

export default Sidebar;
