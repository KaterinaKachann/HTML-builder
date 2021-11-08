const fs = require("fs");
const path = require("path");
const filesCopyPath = path.join(__dirname, "files-copy");
const filesPath = path.join(__dirname, "files");


fs.rm(filesCopyPath, { recursive: true }, function () {
  fs.mkdir(filesCopyPath, { recursive: true }, (error) => {
    if (error) {
      throw error;
    }

    fs.readdir(filesPath, { withFileTypes: true }, function (err, files) {
      //   listing all files using forEach
      files.forEach(function (file) {
        
        fs.copyFile(
          filesPath + "/" + file.name,
          filesCopyPath + "/" + file.name,
          function () {}
        );      
      });
    });
  });
});



