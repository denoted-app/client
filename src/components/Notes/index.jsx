import React, { useEffect } from 'react';
import axios from 'axios';

import Tag from '../Tag';

const Notes = ({
  notes,
  setNotes,
  showNote,
  activeNoteId,
  isSaving,
  cleanInputFields,
}) => {
  useEffect(() => {
    axios
      .get('/notes')
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isSaving]);

  return (
    <div className='notes max-w-md flex flex-col bg-gray-100 border-solid border-r border-gray-300'>
      <div className='p-4 border-b border-gray-300'>
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
        {notes &&
          notes.map((n) => (
            <a
              href='#'
              className={`note ${
                activeNoteId === n.id
                  ? 'active bg-gray-300 border-t border-b border-gray-400 text-black hover:bg-gray-400 hover:bg-opacity-75'
                  : 'p-4 text-gray-600 transition duration-200 ease-in-out border-t border-b border-transparent flex text-sm hover:bg-gray-200 hover:text-gray-800'
              }`}
              key={n.id}
              onClick={(e) => showNote(e, n.id)}>
              {n.title}
              <div className='tags'>
                {n.tags &&
                  n.tags.map((t) => (
                    <Tag id={t.id} text={t.text} showClose={false} />
                  ))}
              </div>
            </a>
          ))}
      </div>
      <button
        class='new-note-btn bg-green-500 text-white font-light py-2 px-4 mx-4 rounded text-sm hover:bg-green-600'
        onClick={cleanInputFields}>
        <i className='fas fa-plus mr-1'></i>
        New Note
      </button>
    </div>
  );
};

export default Notes;
