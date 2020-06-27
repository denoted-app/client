import React from 'react';

import CategoryItem from './CategoryItem';

const Categories = () => (
  <div className='categories mt-8'>
    <h5 className='mb-4 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs flex opacity-75'>
      Categories
      <a
        href='#'
        className='ml-auto hover:text-gray-700 transition duration-200 ease-in-out'>
        <i className='fas fa-plus'></i>
      </a>
    </h5>
    <div className='sidebar-navigation'>
      <CategoryItem text={'Default'} count={'12'} color={'green'} />
      <CategoryItem text={'Notes'} count={'4'} color={'red'} />
      <CategoryItem text={'Todos'} count={'4'} color={'indigo'} />
      <CategoryItem text={'Ideas'} count={'12'} color={'yellow'} />
    </div>
  </div>
);

export default Categories;
