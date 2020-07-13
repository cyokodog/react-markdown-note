const liveServer = require('live-server');

liveServer.start({
  root: 'public', // Set root directory that's being served. Defaults to cwd.
  file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
});
