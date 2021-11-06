const fs = require("fs");
const path = require("path");
const filesCopyPath = path.join(__dirname, "files-copy");
const filesPath = path.join(__dirname, "files");

// create new directory files-copy
fs.mkdir(filesCopyPath, { recursive: true }, (error) => {
  if (error) {
    throw error;
  }
});

fs.readdir(filesPath, { withFileTypes: true }, function (err, files) {
//   listing all files using forEach
  files.forEach(function (file) {
    console.log(file);
    fs.copyFile(
        filesPath + "/" + file.name, 
        filesCopyPath + "/" +file.name,
        function() {}
    );
  });
});

