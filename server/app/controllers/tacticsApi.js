exports.tacticsGenDocx = function (req, res) {
  var PizZip = require('pizzip');
  var Docxtemplater = require('docxtemplater');

  var fs = require('fs');
  var path = require('path');

  //Load the docx file as a binary
  var content = fs
    .readFileSync(path.resolve(__dirname, '../templates/tactics.docx'), 'binary');

  var zip = new PizZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData({
    date: '.11.19',
    date_expanded: 'Восьмого листопада 2019 року',
    platoons: '1, 2 навчальних взводів',
    squadron: '1 навчальної роти',
    time: 'з 8.00 до 13.05',
    exercises: [
      {
        exercise_name: 'загальним керівником занять',
        exercise_chief: 'тимчасово виконуючого обов’язки начальника циклової комісії загально-військових дисциплін старшого сержанта Яремчука В.М.;'
      },
      {
        exercise_name: 'керівником заняття з безпеки бою',
        exercise_chief: 'командира 4 навчального взводу 1 навчальної роти молодшого лейтенанта Нижника О.А.;'
      }
    ]
  });

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
  }
  catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    }
    console.log(JSON.stringify({ error: e }));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
  }

  var buf = doc.getZip()
    .generate({ type: 'nodebuffer' });

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(__dirname, '../templates/tactics_output.docx'), buf);

  // RESPONCE
  res.status(200).json({ data: 'Document rendered and writed' });

}