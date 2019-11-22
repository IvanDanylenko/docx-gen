const testApi = require('./controllers/testApi');
const tacticsApi = require('./controllers/tacticsApi');
const vidomostiApi = require('./controllers/vidomostiApi');

module.exports = function(app){
  app.get('/api/test', testApi.testFunc);
  app.post('/api/test', testApi.testPostFunc);

  app.get('/api/tactics', tacticsApi.tacticsTest);
  app.post('/api/tactics', tacticsApi.tacticsGenDocx);

  app.get('/api/vidomosti', vidomostiApi.generateVidomosti);
};