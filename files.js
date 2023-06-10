const fs = require('fs');

// reading files
// fs.readFile('./docs/blog1.txt', ((err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// }));
// console.log('done');


// writing files
// fs.writeFile('./docs/blog1.txt', 'hello world', () => {
//   console.log('writing done.');
// });


// directories
// if (fs.existsSync('./assets')) {
//   fs.rmdir('./assets', (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('dir delete');
//   })
// } else {
//   fs.mkdir('./assets', (err) =>{
//     if (err) {
//       console.log(err);
//     }
//     console.log('done.');
//   })
// }


// deleting files
// fs.writeFile('./docs/deleteme.txt', 'hahahahha',(err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('writeFile');
// })
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('delete done.');
  })
}