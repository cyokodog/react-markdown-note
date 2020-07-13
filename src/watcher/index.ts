import * as fs from 'fs';
import * as chokidar from 'chokidar';
import path from 'path';
import { createTextFile, getFilePaths } from './fileIo';

const notesDir = 'public/notes';
const watcherPath = `${notesDir}/*.md`;
const notesFileName = '_notes.md';

const log = console.log.bind(console);
const watcher = chokidar.watch(watcherPath);

const getPageHash = (currentPath) => {
  return '#' + path.basename(currentPath).replace(/(\..+)$/g, '');
};

const getTitle = (headingText: string) => {
  return headingText.replace(/^# (.+)/g, '$1');
};

const makeSitemap = (changedFilePath) => {
  if (path.basename(changedFilePath) === notesFileName) return;

  const paths = getFilePaths(notesDir);

  const listItems = [`- [トップ](#index)`];
  paths.forEach((currentPath) => {
    if (
      path.extname(currentPath) !== '.md' ||
      path.basename(currentPath) === notesFileName ||
      path.basename(currentPath) === 'index.md'
    )
      return;

    console.log('base', path.basename(currentPath));
    const md = fs.readFileSync(currentPath, 'utf8');
    const lines = md.split('\n');
    if (!lines || !lines.length) return;
    const title = getTitle(lines[0]);
    const pageHash = getPageHash(currentPath);
    listItems.push(`- [${title}](${pageHash})`);
  });
  createTextFile(`${notesDir}/${notesFileName}`, listItems.join('\n'));
};

watcher.once('ready', () => {
  watcher
    .on('add', (path) => {
      makeSitemap(path);
    })
    .on('change', (path) => {
      makeSitemap(path);
    })
    .on('unlink', (path) => {
      makeSitemap(path);
    });
});
