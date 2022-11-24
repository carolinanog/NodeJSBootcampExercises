/*const hello = 'Hello World!';
console.log(hello);
import fs from 'fs';
///////FILES
Blocking, synchronous code

const fs = require('fs');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is what we know about avocados: ${textIn}!
Created on ${Date.now()}.`;

fs.writeFileSync('./txt/output.txt', textOut);
console.log('File successfully written!');
*/

//Non-blocking, asynchronous code
//const fs = require('fs');

// fs.readFile('./txt/start.txt','utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n ${data3}`, 'utf-8', (err) =>{
//                 console.log('Your file has been written!')
//             });
//         });    
//     });
// });

// const fs = require('fs');
// fs.readFile('./txt/start.txt','utf-8', (err, data1) => {
//     if (err) return console.log('ERROR!💣');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n ${data3}`, 'utf-8', (err) =>{
//                 console.log('Your file has been written!')
//             });
//         });    
//     });
// });

///////////////////////////////
// SERVER

const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
     output = output.replace(/{%PRICE%}/g, product.price);
      output = output.replace(/{%FROM%}/g, product.from);
       output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
        output = output.replace(/{%QUANTITY%}/g, product.quantity);
         output = output.replace(/{%DESCRIPTION%}/g, product.description);
          output = output.replace(/{%ID%}/, product.id);
            if (product.organic === false) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
            return output;
}

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);


const server = http.createServer((req, res) => {
    const pathName = req.url;
    //Overview page
    if(pathName === '/' ||pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        
        const cardsHTML = dataObject.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        res.end(output);

    //Product page
    } else if (pathName === '/product') {
        const product = dataObj[query.id];
        const output = replaceTemplate(templateProduct, product);
        res.end(output);

    //API page
    } else if(pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);

    // Not Found    
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world!'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000.')
});


