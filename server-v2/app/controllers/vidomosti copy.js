var path = require('path')
const createReport = require('docx-templates').default;

function writeToDocTemplateFile(data) {
  const templatePath = path.join(__dirname, '..', 'templates', 'vidomist.doc')
  const outputPath = path.join(__dirname, '..', 'templates', 'output', 'vidomist-gen.docx')
 
  try {
    createReport({
      // cmdDelimiter: ['{', '}'],
      template: templatePath,
      output: outputPath,
      data: {
        name: "Ivan"
      }
    });
  }
  catch (e) {
    console.log("error (line 19)")
  }
  
}

exports.onMorning = function (req, res) {
  const data = {
    name: "Ivan"
  }

  let success = true;

  try {
    writeToDocTemplateFile(data)
  }
  catch(err) {
    success = false;
    // console.log(err)
    // res.send(err)
  }

  if (success) {
    res.send("Morning vidomist generated");
  } else {
    console.log("error (line 94)")
  }
}