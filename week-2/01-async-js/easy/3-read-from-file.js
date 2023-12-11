fs = require('fs');

function readFromFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFromFile('dummy.txt').then((data)=>{
  console.log(data);
})