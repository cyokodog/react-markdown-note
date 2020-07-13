import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchNoteMarkdown } from './store/thunks/fetchNoteMarkdown';

export const NoteLoader: React.FC<{ slug: string }> = (props) => {
  const { slug } = props;
  const dispatch: AppDispatch = useDispatch();

  const Note = React.lazy(async () => {
    await dispatch(fetchNoteMarkdown({ slug }));
    return import('./Note').then((module) => ({
      default: () => module.Note({}),
    }));
  });
  return <Note />;
};
