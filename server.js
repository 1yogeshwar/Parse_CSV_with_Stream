const express = require('express');
const csvRoutes = require('./routes/csv.routes');


const app = express();


app.use('/api/upload', csvRoutes);

app.listen(3000, (req, res) =>{
        console.log('Server is up and running on port 3000');
})