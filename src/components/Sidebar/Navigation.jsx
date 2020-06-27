import React from 'react';

import NavItem from './NavItem';

const Navigation = ({ notesCount }) => (
  <>
    <h5 className='mb-4 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs opacity-75'>
      Navigation
    </h5>
    <div className='sidebar-navigation'>
      <NavItem
        text={'All Notes'}
        count={notesCount}
        active={true}
        icon={'book'}
      />
      <NavItem text={'Starred'} count={'0'} active={false} icon={'star'} />
      <NavItem text={'Drafts'} count={'0'} active={false} icon={'edit'} />
      <NavItem text={'Trash'} count={'0'} active={false} icon={'trash'} />
    </div>
  </>
);

export default Navigation;
