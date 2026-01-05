const  csvService = require('../service/csv.service')

const validateCsv = async (req, res) =>{
        if(!req.file){
                res.status(404).json("Please upload a file");

                // console.log(req.file)
        }
        const fileBuffer = req.file.buffer;

        const result = await csvService.processCsv(fileBuffer); // ADD THIS
        //  console.log(fileBuffer)
        res.send(result);     

}

module.exports = {
        validateCsv
}