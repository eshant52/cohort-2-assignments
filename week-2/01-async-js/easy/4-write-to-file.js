const fs = require('fs');


function writeFromFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err)=>{
      if (err) reject(err);
      resolve();
    })
  });
}

writeFromFile('dummy.txt', 'Hi!, I am Eshant.');