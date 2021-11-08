const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "styles");
const directoryCopyPath = path.join(__dirname, "project-dist");
const filesCopyPath = path.join(directoryCopyPath, "bundle.css");

fs.readdir(directoryPath, { withFileTypes: true }, function (err, files) {
  //   listing all files using forEach

    fs.writeFile(filesCopyPath, "", function(err) {
        if(err) {
            return console.log(err);
        }

        files.forEach(function (file) {
            if (file.isFile() && path.extname(file.name) == ".css") {
                let path = directoryPath + "/" + file.name

                fs.readFile(path, 'utf8' , (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    fs.appendFile(filesCopyPath, data, function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    });
                    
                })
            }
        })
    });        
});
