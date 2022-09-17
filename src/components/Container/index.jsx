import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import axios from 'axios';

import Sidebar from '../Sidebar';
import Notes from '../Notes';
import Tag from '../Tag';

import { DEFAULT_PAGE } from '../../constants';

const Container = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activePage, setActivePage] = useState(DEFAULT_PAGE);

  const cleanInputFields = () => {
    setTitle('');
    setBody('');
    setTags([]);
    setActiveNoteId(null);
  };

  const handleTagsDelete = (id) => {
    const tempTags = tags.filter((tag) => tag.id !== id);
    setTags(tempTags);
  };

  const handleTagsChange = (e) => {
    const tag = e.target.value.replace(',', '').replace(/ /g, '-');
    /* Add a new tag if the user presses comma */
    if (e.keyCode === 188) {
      e.target.value = '';
      if (tag !== '') setTags([...tags, { id: tags.length + 1, text: tag }]);
    }
  };

  const handleBackspace = (e) => {
    const tag = e.target.value.replace(',', '').replace(/ /g, '-');
    /* Remove the last tag if user presses backspace */
    if (e.keyCode === 8 && tag.length === 0) {
      handleTagsDelete(tags[tags.length - 1].id);
    }
  };

  const handleSubmit = () => {
    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

    if (title && body) {
      setIsSaving(true);

      if (!activeNoteId) {
        axios
          .post('/notes', {
            title: title,
            body: body,
            tags: tags,
          })
          .then(() => {
            setIsSaving(false);
            setNotes([...notes, { id: notes.length + 1, title, body, tags }]);
            cleanInputFields();
          })
          .catch((err) => {
            console.log(err);
            setIsSaving(false);
          });
      } else {
        axios
          .put('/notes', {
            id: activeNoteId,
            title: title,
            body: body,
            tags: tags,
          })
          .then(() => {
            setIsSaving(false);
            findAndUpdateNote(activeNoteId);
          })
          .catch((err) => {
            console.log(err);
            setIsSaving(false);
          });
      }
    }
  };

  const showNote = (e, id) => {
    e.preventDefault();
    const note = notes.filter((n) => n.id === id)[0];
    setTitle(note.title);
    setBody(note.body);
    setTags(note.tags);
    setActiveNoteId(note.id);
  };

  const findAndUpdateNote = (id) => {
    let tempNotes = notes;
    tempNotes.map((t) => {
      if (t.id === id) {
        t.title = title;
        t.body = body;
        t.tags = tags;
      }
    });
    setNotes(tempNotes);
  };

  return (
    <div className='flex h-screen subpixel-antialiased'>
      <Sidebar notesCount={notes && notes.length} />
      <Notes
        notes={notes}
        setNotes={setNotes}
        showNote={showNote}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
        isSaving={isSaving}
        cleanInputFields={cleanInputFields}
      />
      <div className='editor p-5 w-full'>
        <div className='form-group flex flex-col mb-4 border border-gray-300'>
          <input
            type='text'
            id='title'
            className='form-control px-2 py-3'
            placeholder='Title...'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            disabled={isSaving}
          />
        </div>
        <div className='form-group flex flex-col mb-4'>
          <div className='editor-area border border-gray-300'>
            <CKEditor
              editor={InlineEditor}
              data={body}
              disabled={isSaving}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
              }}
            />
          </div>
        </div>
        <div className='form-group flex flex-col mb-4'>
          <label htmlFor='tags'>Tags</label>
          <div className='tags-container flex border border-gray-300 px-3 py-2'>
            <div className='tags'>
              {tags &&
                tags.map((t, i) => (
                  <Tag
                    id={t.id}
                    text={t.text}
                    showClose={true}
                    handleTagsDelete={handleTagsDelete}
                  />
                ))}
            </div>
            <input
              type='text'
              id='tags'
              className='form-control text-sm px-2'
              placeholder='Add a new tag here'
              onKeyUp={handleTagsChange}
              onKeyDown={handleBackspace}
            />
          </div>
        </div>
        <div className='tray'>
          <span
            className={`status-text text-green-500 text-xs  ml-3 ${
              isSaving ? 'saving' : 'saved'
            }`}>
            {!isSaving && <i className='fas fa-check mr-1'></i>}
          </span>
          <div className='action-buttons text-sm ml-auto'>
            <button
              className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded'
              onClick={handleSubmit}
              disabled={isSaving}>
              <i className='fas fa-save mr-1'></i>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
