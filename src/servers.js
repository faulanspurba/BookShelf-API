import Hapi from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  server.route(routes);
  await server.start();
  console.log(`Server running on : ${server.info.uri}`);
};

export default init;
