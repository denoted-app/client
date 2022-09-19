import React from 'react';
import Tag from '../Tag';

const NoteItem = ({
  note,
  showNote,
  activeNoteId
}) => {
  return (
    <a
      href='#'
      className={`note ${
        activeNoteId === note.id
          ? 'active bg-gray-300 border-t border-b border-gray-400 text-black hover:bg-gray-400 hover:bg-opacity-75'
          : 'p-4 text-gray-600 transition duration-200 ease-in-out border-t border-b border-transparent flex text-sm hover:bg-gray-200 hover:text-gray-800'
      }`}
      key={note.id}
      onClick={(e) => showNote(e, note.id)}>
      {note.title}
      <div className='tags'>
        {note.tags &&
          note.tags.map((t) => (
            <Tag id={t.id} text={t.text} showClose={false} />
          ))}
      </div>
    </a>
  );
};

export default NoteItem;
