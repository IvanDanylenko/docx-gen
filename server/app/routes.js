const testApi = require('./controllers/testApi');

module.exports = function(app){
  app.get('/api/test', testApi.testFunc);
  app.post('/api/test', testApi.testPostFunc);
};