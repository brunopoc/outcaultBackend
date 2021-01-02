const app = require('./app');

const server = {
  normalizePort: (val) => {
    const portServer = parseInt(val, 10);
    if (Number.isNaN(portServer)) {
      return portServer;
    }
    if (portServer >= 0) {
      return portServer;
    }
    return false;
  },
  onError: (error) => {
    let port;

    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  },
  onListening: () => {
    const addr = app.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    console.log(`API rodando na porta ${bind}`);
  },
  run: () => {
    const port = server.normalizePort(process.env.PORT || '4000');
    app.set('port', port);
    app.listen(port);
    app.on('error', server.onError);
    app.on('listening', server.onListening);
  },
};

server.run();
