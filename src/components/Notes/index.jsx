import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import NoteItem from './NoteItem';
import { GET_NOTES } from '../../queries/getNotes';

const Notes = ({
  notes,
  setNotes,
  showNote,
  activeNoteId,
  cleanInputFields,
}) => {
  const { loading, error, data } = useQuery(GET_NOTES);

  if (error) return <p>sumtin went wong</p>;
  if (loading || !data) return <p>loading dem notes</p>;

  console.log(data.notes)
  setNotes(data.notes);

  return (
    <div className='notes max-w-md flex flex-col bg-gray-100 border-solid border-r border-gray-300'>
      <div className='p-4 border-b border-gray-300 hidden'>
        <div className='pt-1'>
          <h5 className='text-gray-500 uppercase tracking-wide text-sm lg:text-xs'>
            <input
              className='bg-transparent appearance-none w-full py-2 text-gray-700 text-sm lg:text-xs leading-tight focus:outline-none'
              id='search'
              type='text'
              placeholder='Search...'
            />
          </h5>
        </div>
      </div>
      <div className='notes-list'>
        {data.notes &&
          data.notes.map((note) => (
            <NoteItem
              note={note}
              showNote={showNote}
              activeNoteId={activeNoteId}
            />
          ))}
      </div>
      <button
        className='new-note-btn bg-green-500 text-white font-light py-2 px-4 mx-4 rounded text-sm hover:bg-green-600'
        onClick={cleanInputFields}>
        <i className='fas fa-plus mr-1'></i>
        New Note
      </button>
    </div>
  );
};

export default Notes;
