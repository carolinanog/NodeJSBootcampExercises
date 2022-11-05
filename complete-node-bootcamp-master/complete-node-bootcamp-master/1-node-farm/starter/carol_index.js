/*const hello = 'Hello World!';
console.log(hello);
import fs from 'fs';
*/

const fs = require('fs');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is what we know about avocados: ${textIn}!
Created on ${Date.now()}.`;

fs.writeFileSync('./txt/output.txt', textOut);
console.log('File successfully written!')