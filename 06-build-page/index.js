const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const readline = require("readline");

const createDir = path.join(__dirname, "project-dist");
const creatDirAssets = path.join(createDir, "assets");
const creatDirFonts = path.join(creatDirAssets, "fonts");
const creatDirImg = path.join(creatDirAssets, "img");
const creatDirSvg = path.join(creatDirAssets, "svg");
const creatFileHtml = path.join(createDir, "index.html");
const creatFileCss = path.join(createDir, "style.css");



const filesPathAssets = path.join(__dirname, "assets");
const filesPathFonts = path.join(filesPathAssets, "fonts");
const filesPathImg = path.join(filesPathAssets, "img");
const filesPathSvg = path.join(filesPathAssets, "svg");
const filesPathCss = path.join(__dirname, "styles");
const filesPathHtml = path.join(__dirname, "template.html");

const filesPathComponents = path.join(__dirname, "components");



fs.readFile(filesPathHtml, 'utf8', (err, fileContent) => {
  if(err) throw err;
  template = fileContent;
});


      fs.rm(createDir, { recursive: true }, function () {
        fs.mkdir(createDir, { recursive: true }, (error) => {
          if (error) {
            throw error;
          }

          // build index.html
          fs.readdir(filesPathComponents, (err, files) => {
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
                  })
                }
              })
            }
          });

        //  build assets
        fs.mkdir(creatDirAssets, { recursive: true }, (error) => {
          if (error) {
            throw error;
          }

          fs.mkdir(creatDirFonts, { recursive: true }, (error) => {
            if (error) {
              throw error;
            }

            fs.mkdir(creatDirImg, { recursive: true }, (error) => {
              if (error) {
                throw error;
              }

              fs.mkdir(creatDirSvg, { recursive: true }, (error) => {
                if (error) {
                  throw error;
                }

                fs.readdir(
                  filesPathCss,
                  { withFileTypes: true },
                  function (err, files) {
                    //   listing all files using forEach

                    fs.writeFile(creatFileCss, "", function (err) {
                      if (err) {
                        return console.log(err);
                      }

                      files.forEach(function (file) {
         
                        if (
                          file.isFile() &&
                          path.extname(file.name) == ".css"
                        ) {
                          let path = filesPathCss + "/" + file.name;

                          fs.readFile(path, "utf8", (err, data) => {
                            if (err) {
                              console.error(err);
                              return;
                            }

                            fs.appendFile(creatFileCss, data, function (err) {
                              if (err) throw err;
                              console.log("Saved!");
                            });
                          });
                        }
                      });
                    });
                  }
                );
                fs.readdir(
                  filesPathFonts,
                  { withFileTypes: true },
                  function (err, files) {
          
                    //   listing all files using forEach
                    files.forEach(function (file) {
         
                      fs.copyFile(
                        filesPathFonts + "/" + file.name,
                        creatDirFonts + "/" + file.name,
                        function () {}
                      );

                      fs.readdir(
                        filesPathImg,
                        { withFileTypes: true },
                        function (err, files) {
      
                          //   listing all files using forEach
                          files.forEach(function (file) {
             
                            fs.copyFile(
                              filesPathImg + "/" + file.name,
                              creatDirImg + "/" + file.name,
                              function () {}
                            );

                            fs.readdir(
                              filesPathSvg,
                              { withFileTypes: true },
                              function (err, files) {
                   
                                //   listing all files using forEach
                                files.forEach(function (file) {
          
                                  fs.copyFile(
                                    filesPathSvg + "/" + file.name,
                                    creatDirSvg + "/" + file.name,
                                    function () {}
                                  );
                                });
                              }
                            );
                          });
                        }
                      );
                    });
                  }
                );
              });
            });
          });
        });
      });
    });

