const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, 'secret-folder');

fs.readdir(directoryPath, { withFileTypes: true }, function (err, files) {
   
    //listing all files using forEach
    files.forEach(function (file) {
        if(file.isFile()){
            fs.stat(directoryPath + "/" + file.name, (error, stats) => {
                console.log(path.parse(file.name).name + " " +"-" + " " + " " + path.extname(file.name) + " " + "-" + " " + stats.size ); 
            })
          
        }
        
    });
});
