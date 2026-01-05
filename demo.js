// // services/csvService.js - NO ARRAY, stream directly

// const csv = require('csv-parser');
// const { Readable, Transform } = require('stream');

// exports.processCSV = (fileBuffer, requiredHeaders) => {
  
//   let isFirstRow = true;
//   let rowCount = 0;
  
//   // Create transform stream that processes one row at a time
//   const validateStream = new Transform({
//     objectMode: true,
    
//     transform(row, encoding, callback) {
      
//       // STEP 1: Validate headers (only once)
//       if (isFirstRow) {
//         const csvHeaders = Object.keys(row);
        
//         console.log('Checking headers...');
        
//         let i = 0;
//         while (i < requiredHeaders.length) {
//           const needed = requiredHeaders[i];
          
//           if (!csvHeaders.includes(needed)) {
//             return callback(new Error(`Header "${needed}" is missing`));
//           }
          
//           i++;
//         }
        
//         console.log('✓ Headers OK');
//         isFirstRow = false;
//       }
      
//       // STEP 2: Validate this row
//       const remarks = [];
      
//       let j = 0;
//       while (j < requiredHeaders.length) {
//         const column = requiredHeaders[j];
//         const value = row[column];
        
//         // Check if null, undefined, empty
//         if (value === null || value === undefined || value === '') {
//           remarks.push(`${column} is empty`);
//         }
//         // Check if zero
//         else if (value === '0' || value === 0) {
//           remarks.push(`${column} is zero`);
//         }
        
//         j++;
//       }
      
//       // Add remarks to row
//       row.remarks = remarks.length > 0 ? remarks.join('; ') : '';
      
//       rowCount++;
//       // Send this row immediately (no storage!)
//       this.push(row);
      
//       // Ready for next row
//       callback();
//     },
    
//     final(callback) {
//       console.log(`Total rows processed: ${rowCount}`);
//       callback();
//     }
//   });
  
//   // Return the stream (not array!)
//   const readStream = Readable.from(fileBuffer);
//   return readStream.pipe(csv()).pipe(validateStream);
// };



// controllers/csvController.js - Stream response (no waiting!)

// const csvService = require('../services/csvService');

// exports.validateCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('Please upload a file');
//     }
    
//     const fileBuffer = req.file.buffer;
    
//     // Your CSV headers
//     const requiredHeaders = [
//       'ID',
//       'Year',
//       'Date',
//       'Stage',
//       'Home Team',
//       'Away Team',
//       'Host Team'
//     ];
    
//     // Get stream (NOT array!)
//     const validatedStream = csvService.processCSV(fileBuffer, requiredHeaders);
    
//     // For now, send as JSON array
//     // (Next step: we'll convert to CSV for download)
//     const rows = [];
    
//     validatedStream.on('data', (row) => {
//       rows.push(row); // Temporary for JSON response
//     });
    
//     validatedStream.on('end', () => {
//       res.json({
//         message: 'Validation complete!',
//         totalRows: rows.length,
//         rows: rows
//       });
//     });
    
//     validatedStream.on('error', (error) => {
//       res.status(400).send('Error: ' + error.message);
//     });
    
//   } catch (error) {
//     res.status(400).send('Error: ' + error.message);
//   }
// };