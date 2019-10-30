// const app = require('./app/server');

// app.listen(8080, function(){
//   console.log('you may use rest api at port 8080');
// });


/* OFFICE GEN TEST */
const officegen = require('officegen')
const fs = require('fs')

// Create an empty Word object:
let docx = officegen({
  type: 'docx',
  pageMargins: {
    top: 1600,
    right: 1440,
    bottom: 1800,
    left: 1600
  }
})

// Officegen calling this function after finishing to generate the docx document:
docx.on('finalize', function(written) {
  console.log(
    'Finish to create a Microsoft Word document.'
  )
})

// Officegen calling this function to report errors:
docx.on('error', function(err) {
  console.log(err)
})

// Create a new paragraph:
let pObj = docx.createP()

pObj.addText('Документ згенеровано', { highlight: true }) // Highlight!

pObj = docx.createP()

pObj = docx.createP()

// Let's generate the Word document into a file:

let out = fs.createWriteStream('example.docx')

out.on('error', function(err) {
  console.log(err)
})

// Async call to generate the output file:
docx.generate(out)