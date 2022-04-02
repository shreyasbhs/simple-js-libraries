// include libraries
const fs = require('fs');
const { exit } = require('process');
const process = require('process');

/*

** This script converts JavaScript code in a file E.g sample.js to its minified
** version and writes it to sample-min.js. It requires the content of js file to
** strict js syntax. For example ';' has to included in variable declaration and 
** assignment. The script tries its best to preserve the js syntax check. But still,
** it can't be guaranteed that minified file passed the js syntax check ):


*/


const arguments = process.argv;


//check command line arguments

if(arguments.length < 3){
    console.log('usage: node minify.js <file.js>');
    exit();
}


//check format of file 
var f_name = arguments[2];
if(f_name.split('.')[1]!=='js'){
    console.log('Incorrect File format: input file should have .js extension');
    exit();
}

// read js file
try{

    var content = fs.readFileSync(f_name,'utf-8');

}
catch(err){
    console.log(err);
}


var i = 0;


// remove multiple line comments i.e, "/* ... */"

var content_min = '';
while(i < content.length){

    if(content[i] === '/' && i+1 < content.length && content[i+1] === '*')
      {
     
        i = i+2;
        while(i < content.length){ 
            
            
        if(i+1< content.length && content[i] === '*' && content[i+1] === '/'){
            i = i+2;
            break;
        }
        i+=1;
               
            
          }
      }
    else{
        
        content_min += content[i]; 
        i+=1;
      }
      
}

// remove single line comments i.e "//"


i = 0;

//update  content and restet content_min
content = content_min;
content_min = '';


   var lines = content.split('\n');
   for(var j = 0;j < lines.length;j++)
     {
         
        if(lines[j].search('//') !== -1)
            continue;
           
     
        content_min += lines[j];
       
     }



// remove extra spaces and new lines
//update  content and restet content_min

content = content_min;
content_min = '';

while(i<content.length){
    if(content[i]!=='\n'  && content[i]!=='\t'){
          content_min += content[i];
          if(content[i] === ' '){
          while(content[i] === ' ' && i< content.length)
             i+=1;
          }
          else
            i+=1;
        }
        
    else
        i+=1;

}

// create minified name
f_name = f_name.split('.');
f_name = f_name[0] + '-min.' + f_name[1];



// write to minified file.
try{
    fs.writeFileSync(f_name,content_min);
    // console.log(content_min);
}
catch(err){
    console.log(err);
}



