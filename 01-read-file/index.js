const fs = require('fs');

const path = require('path');
let baseText = path.join('/text.txt');

let readStream = fs.createReadStream(__dirname + baseText, 'utf8');
let content;

readStream.on('data', function(c){
    content = c;
    show();
    
});

function show(){
    console.log(content);
}
