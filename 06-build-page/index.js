const fs = require("fs");
const path = require("path");
const readline = require("readline");

const createDir = path.join(__dirname, "project-dist");
const creatDirAssets = path.join(createDir, "assets");
const filesPathAssets = path.join(__dirname, "assets");

//read file template 
fs.readFile(path.join(__dirname, "template.html"),"utf8",(err, fileContent) => {
    if (err) throw err;
    template = fileContent;
});

//build folder project-dist
fs.rm(path.join(__dirname, "project-dist"), { recursive: true }, function () {
    fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (error) => {
        if (error) {
          throw error;
        }


//build html
fs.readdir(path.join(__dirname, "components"), (err, files) => {
    if (err) throw err;
    for (const file of files) {

      fs.stat(path.join(__dirname, 'components', file), (err, stats) => {
        if (err) throw err;
        if (stats.isFile() && path.extname(file) === '.html') {

          fs.readFile(path.join(__dirname, 'components', file), 'utf8', (err, html) => {
            if(err) throw err;

            template = template.replace(`{{${path.parse(file).name}}}`, html);
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, err => {
              if (err) throw err;
            });
          });
        };
      });
    };
  });

//built folder assets
fs.mkdir(path.join(createDir, "assets"), { recursive: true }, (error) => {
    if (error) {
      throw error;
    }
});

//built folder fonts
fs.mkdir(path.join(creatDirAssets, "fonts"), { recursive: true }, (error) => {
    if (error) {
    throw error;
};
fs.readdir(path.join(filesPathAssets, "fonts"), { withFileTypes: true }, function (err, files) {

    //   listing all files using forEach
    files.forEach(function (file) {

      fs.copyFile(path.join(filesPathAssets, "fonts") + "/" 
      + file.name,path.join(creatDirAssets, "fonts") + "/" + file.name,function () {});
  });
});

//built folder img
    fs.mkdir(path.join(creatDirAssets, "img"), { recursive: true }, (error) => {
        if (error) {
        throw error;
    }
    fs.readdir(path.join(filesPathAssets, "img"),{ withFileTypes: true },function (err, files) {
          //   listing all files using forEach
          files.forEach(function (file) {

            fs.copyFile(path.join(filesPathAssets, "img") + "/" 
            + file.name, path.join(creatDirAssets, "img") + "/" + file.name,
              function () {});
        });
    });
});

//built folder svg
    fs.mkdir(path.join(creatDirAssets, "svg"), { recursive: true }, (error) => {
        if (error) {
        throw error;
        }
    });
    fs.readdir(path.join(filesPathAssets, "svg"), { withFileTypes: true }, function (err, files) {
          //   listing all files using forEach
          files.forEach(function (file) {
            fs.copyFile(path.join(filesPathAssets, "svg") + "/"
             + file.name, path.join(creatDirAssets, "svg") + "/" + file.name,
              function () {}
            );
        });  
    });
});

//built file css
fs.readdir(path.join(__dirname, "styles"), { withFileTypes: true }, function (err, files) {
    console.log(files)
      //   listing all files using forEach
      fs.writeFile(path.join(createDir, "style.css"), "", function (err) {
        if (err) { return console.log(err); }

        files.forEach(function (file) {
          if ( file.isFile() && path.extname(file.name) == ".css") {
            let paths = path.join(__dirname, "styles") + "/" + file.name;

            fs.readFile(paths, "utf8", (err, data) => {
              if (err) {console.error(err); return; }

              fs.appendFile(path.join(createDir, "style.css"), data, function (err) {
                if (err) throw err;
                console.log("Saved!");
              });
            });
          }
        });
      });
    }
  );
});
});