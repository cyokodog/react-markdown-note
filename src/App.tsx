import React, { Suspense } from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Switch,
  useParams,
} from 'react-router-dom';

import { NoteLoader } from './containers/Note/NoteLoader';

const NoteWithSlug = () => {
  const { slug } = useParams();
  return <NoteLoader slug={slug || 'index'} />;
};
export const App: React.FC = () => {
  return (
    <>
      <header>
        <h1>Notes</h1>
      </header>

      <Router basename={'dist'}>
        <Suspense fallback={<div>初期化中...</div>}>
          <Switch>
            <Route path="/:slug">
              <NoteWithSlug />
            </Route>
            <Route path="/">
              <NoteWithSlug />
            </Route>
          </Switch>
        </Suspense>
      </Router>

      <footer>
        <a href="https://github.com/cyokodog/react-markdown-note">markdown-note</a>
      </footer>
    </>
  );
};
