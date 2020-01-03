const writeToDocTemplateFile = require('./write-template')

exports.onMorning = function (req, res) {
  const data = {
    name: 'John',
    clients: [
      {
        first_name: "John",
        last_name: "Doe",
        phone: "+44546546454"
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        phone: "+445476454"
      }
    ]
  }

  writeToDocTemplateFile.writeToDocTemplateFile(data)

  res.send("Morning vidomist generated");
}