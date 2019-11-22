exports.generateVidomosti = function (req, res) {

  /* Успешно читает xlsx файлы */
  // const readXlsxFile = require('read-excel-file/node');
  // readXlsxFile('app/templates/data.xlsx', { 
  //   sheet: 'Зведений розклад',
  // })
  //   .then((rows) => {
  //     res.json(rows);
  //   })
  //   .catch((e) => {
  //     res.json(e);
  //     console.log(e)
  //   })

  const data = require('../templates/data.json');
  let output;

  for (let item in data) {
    const t = item.indexOf('Підрозділ');
    if (t !== -1) {
      output = t;
      break;
    }
  }

  // const result = Object.values(yourJSON.roots)
  //   .map(flatten)
  //   .reduce((a,b) => a.concat(b), []);
  
  res.json({data: output});

  
  // res.status(200).json({ data: 'Vidomosty generated' });
};