function writeToDocTemplateFile(data) {
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
  // set data for template
  doc.setData(data)

  try {
    // render the document
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

  const fileName = `Тк ${data.squadron.slice(0,1)}НР ${data.dateObj.day}.${data.dateObj.month}`;
  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(__dirname, `../templates/output/${fileName}.docx`), buf);
}

exports.tacticsGenDocx = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const body = req.body;

  //set the templateVariables
  const mockData = {
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
  };

  const data = {
    dateObj: body.date,
    date: body.date_short,
    date_expanded: body.date_expanded,
    platoons: body.platoons_expanded + ' ',
    squadron: body.squadron,
    time: body.time_expanded,
    exercises: body.exercises_generated
  };

  // console.log(data)

  writeToDocTemplateFile(data);

  // RESPONCE
  res.status(200).json("Document generated");

}

exports.tacticsTest = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const body = req.body;

  // RESPONCE
  res.status(200).json({ data: body });
}