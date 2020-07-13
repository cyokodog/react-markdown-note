import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

export const NoteMain: React.FC<{ markdown: string }> = (props) => {
  const { markdown } = props;
  return (
    <div>
      <ReactMarkdown source={markdown} escapeHtml={true} />
    </div>
  );
};
