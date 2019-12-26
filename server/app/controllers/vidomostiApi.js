const createReport = require('docx-templates');

function writeToDocTemplateFile(data) {
 
  // createReport({
  //   template: '/app/templates/docx-templates/vidomist.docx',
  //   // output: 'a/templates/docx-templates/output/vidomist-output.docx',
  //   data: {
  //     name: 'John',
  //     surname: 'Appleseed',
  //   }
  // });
}

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


  // const data = require('../templates/data.json');
  // let output;

  // for (let item in data) {
  //   const t = item.indexOf('Підрозділ');
  //   if (t !== -1) {
  //     output = t;
  //     break;
  //   }
  // }

  const mockData = {
    
  }

// Idea to parse array
  // const result = Object.values(yourJSON.roots)
  //   .map(flatten)
  //   .reduce((a,b) => a.concat(b), []);
  
  /* res.json({data: output}); */
  try {
    createReport({
      template: './app/templates/docx-templates/vidomist2.doc',
      // output: '../templates/docx-templates/output/vidomist-output.docx',
      data: {
        name: 'John',
        surname: 'Appleseed',
      }
    });
  }
  catch(error) {
    console.log(error)
  }
  
  res.json({data: "generated"});

  
  // res.status(200).json({ data: 'Vidomosty generated' });
};