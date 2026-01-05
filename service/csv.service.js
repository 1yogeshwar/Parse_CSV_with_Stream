const csv = require('csv-parser')
const { Readable} = require('stream');

//this will check the no. of rows pressent also will * file...
const processCsv = (fileBuffer) =>{
        return new Promise((resolve, reject) =>{
                let rowCount = 0;
                const stream = Readable.from(fileBuffer);
              stream
           .pipe(csv())
           .on('data', (row) => {
             rowCount++;
            console.log('Row:', row); 
       })
      .on('end', () => {
        resolve(`Total rows: ${rowCount}`);
       })
      .on('error', reject);
        })
        }

        module.exports = {
                processCsv
        }
