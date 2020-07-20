import app from './app';

const runApp = async (port) => {
  await app.listen(port);
  console.log('Server on port', port);
};

runApp(app.get('port'));
