const vidomosti = require('./controllers/vidomosti');
const readxlsxfile = require('./controllers/readxlsxfile');

module.exports = function(app){
  app.get('/vidomosti/morning', vidomosti.onMorning);
  app.get('/vidomosti/readxlsxfile', readxlsxfile.readxlsxfile);
  // app.get('/vidomosti/afternoon', vidomosti.onAfternoon);
};