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

// const filesCopyPath = path.join(createDir, "assets");

const filesPathAssets = path.join(__dirname, "assets");
const filesPathFonts = path.join(filesPathAssets, "fonts");
const filesPathImg = path.join(filesPathAssets, "img");
const filesPathSvg = path.join(filesPathAssets, "svg");
const filesPathCss = path.join(__dirname, "styles");
const filesPathHtml = path.join(__dirname, "template.html");
const filesPathHeader = path.join(filesPathCss, "header.css");
const filesPathComponents = path.join(__dirname, "components");

fs.readFile(filesPathComponents + "/header.html", "utf8", (err, data) => {
  let headerContent = data;
  if (err) throw err;

  fs.readFile(filesPathComponents + "/articles.html", "utf8", (err, data) => {
    let articlesContent = data;
    if (err) throw err;

    fs.readFile(filesPathComponents + "/footer.html", "utf8", (err, data) => {
      let footerContent = data;
      if (err) throw err;

      fs.rm(createDir, { recursive: true }, function () {
        fs.mkdir(createDir, { recursive: true }, (error) => {
          if (error) {
            throw error;
          }

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
                          //   console.log(file);
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
                    filesPathHtml,
                    { withFileTypes: true },
                    function (err, files) {
                      var rd = readline.createInterface({
                        input: fs.createReadStream(filesPathHtml),
                        console: false,
                      });

                      rd.on("line", function (line) {
                        if (/{{header}}/i.test(line)) {
                          let line = line.replace(/{{header}}/i, headerContent);
                        }
                        if (/{{articles}}/i.test(line)) {
                          let line = line.replace(/{{articles}}/i, articlesContent);
                        }
                        if (/{{footer}}/i.test(line)) {
                          let line = line.replace(/{{footer}}/i, footerContent);
                        }

                        
                      });
                      fs.writeFile(creatFileHtml, "", function (err) {
                        if (err) {
                          return console.log(err);
                        }
                        fs.appendFile(creatFileHtml, line, (err) => {
                          if (err) console.log(err);
                        });
                      
                      });
                    }
                  );

                  fs.readdir(
                    filesPathFonts,
                    { withFileTypes: true },
                    function (err, files) {
                      // console.log(files);
                      //   listing all files using forEach
                      files.forEach(function (file) {
                        // console.log(file)
                        fs.copyFile(
                          filesPathFonts + "/" + file.name,
                          creatDirFonts + "/" + file.name,
                          function () {}
                        );

                        fs.readdir(
                          filesPathImg,
                          { withFileTypes: true },
                          function (err, files) {
                            //   console.log(files);
                            //   listing all files using forEach
                            files.forEach(function (file) {
                              // console.log(file)
                              fs.copyFile(
                                filesPathImg + "/" + file.name,
                                creatDirImg + "/" + file.name,
                                function () {}
                              );

                              fs.readdir(
                                filesPathSvg,
                                { withFileTypes: true },
                                function (err, files) {
                                  // console.log(files);
                                  //   listing all files using forEach
                                  files.forEach(function (file) {
                                    // console.log(file)
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
    });
  });
});
