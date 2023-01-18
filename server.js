// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8181;
function listening(){
    console.log(`Server is running on ${port}`)
    console.log(`Link : http://localhost:${port}`) // easy way to access the server 
    
}

app.listen(port,listening);


// To show data ( http://localhost:8181/show )

function showData(req,res){
    res.send(projectData)
}
app.get('/show',showData)

// To insert Data ( http://localhost:8181/insert )

function insertData(req,res){
    projectData ={
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    }
    res.send(projectData);
}

app.post("/insert",insertData);