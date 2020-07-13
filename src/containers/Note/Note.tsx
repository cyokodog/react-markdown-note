import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { NoteMain } from './components/NoteMain';
import { NoteList } from './components/NoteList';
import { makeTocElement } from 'toc-util';

export const Note: React.FC = () => {
  const { selectedNoteMarkdown, noteListMarkdown } = useSelector((state: RootState) => state.note);

  useEffect(() => {
    const firstHeadingElement = document.querySelector('main h2') as HTMLHeadingElement;
    const tocElement = makeTocElement(firstHeadingElement, { firstLevel: 2, lastLevel: 4 });
    document.querySelector('.left-side').append(tocElement);
  });

  return (
    <>
      <div className="left-side"></div>
      <main>
        <NoteMain markdown={selectedNoteMarkdown} />
      </main>
      <div className="right-side">
        <NoteList markdown={noteListMarkdown} />
      </div>
    </>
  );
};
