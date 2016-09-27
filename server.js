const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'src')
      }
    }
  }
});

server.connection({
  host: 'localhost',
  port: 3000
});
server.register(Inert, () => {});
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      listing: true
    }
  }
});

server.start((err) => {
  if (err) throw err;

  console.log('Server running at:', server.info.uri);
});
