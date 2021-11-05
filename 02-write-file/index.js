
let fs = require("fs");
let readline = require("readline");
let data = "";

fs.writeFile("./02-write-file/text.txt", data, (err) => {
  if (err) console.log(err);
});

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("Welcome! How are you?");
rl.prompt();

rl.on('line', function(line){
 if(line.match(/^e(xit)?$/i)){
  rl.setPrompt("Bye!");
    rl.prompt();

  rl.pause();
 }else{
  fs.appendFile("./02-write-file/text.txt", line+"\n", (err) => {
    if (err) console.log(err);
  })
 }
});

rl.on('SIGINT', () => {
  rl.setPrompt("Bye");
  rl.prompt();
  rl.pause();
})




