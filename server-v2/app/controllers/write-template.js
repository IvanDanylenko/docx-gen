exports.writeToDocTemplateFile = function (data) {
  // const templatePath = path.join(__dirname, '..', 'templates', 'vidomist.doc')
  // const outputPath = path.join(__dirname, '..', 'templates', 'output', 'vidomist-gen.docx')
 
  var PizZip = require('pizzip');
  var Docxtemplater = require('docxtemplater');

  var fs = require('fs');
  var path = require('path');

  //Load the docx file as a binary
  var content = fs
    .readFileSync(path.resolve(__dirname, '../templates/vidomist.docx'), 'binary');

  var zip = new PizZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData(data);

  try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
  }
  catch (error) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object).
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors.map(function (error) {
              return error.properties.explanation;
          }).join("\n");
          console.log('errorMessages', errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
  }

  var buf = doc.getZip()
    .generate({type: 'nodebuffer'});

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(__dirname, '../templates/output/vidomist-output.docx'), buf);
  
}