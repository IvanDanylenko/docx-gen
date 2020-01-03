exports.readxlsxfile = function (req, res) {

  /* Успешно читает xlsx файлы */
  const readXlsxFile = require('read-excel-file/node');
  readXlsxFile('app/templates/input/Основний Розклад з 06.01 по 11.01.xlsx', { 
    sheet: 'Графік стрільб',
  })
    .then((rows) => {
      res.json(rows)
      // parsing(rows, res)
    })
    .catch((e) => {
      res.json(e);
      console.log(e)
    })

  return;
  const data = require('./data.json');
  parsing(data, res);
  // let output;

  // for (let item in data) {
  //   const t = item.indexOf('Підрозділ');
  //   if (t !== -1) {
  //     output = t;
  //     break;
  //   }
  // }


// Idea to parse array
  // const result = Object.values(yourJSON.roots)
  //   .map(flatten)
  //   .reduce((a,b) => a.concat(b), []);
  

  
  // res.status(200).json({ data: 'Vidomosty generated' });
};

function parsing (data, res) {
  res.json(data[4][0])
}