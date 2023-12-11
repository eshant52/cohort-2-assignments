const fs = require('fs');

function writeFromFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function readFromFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function fileCleaner(fileName) {
  return readFromFile(fileName).then((data)=> {
    return data.split(' ').filter((str) => (str !== '')).join(' ');
  }).then((data)=> {
    return writeFromFile(fileName, data);
  });
}


fileCleaner('clean.txt').then((data) => {
  console.log(data);
}).catch((err)=>{
  console(err);
});