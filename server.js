var express = require("express");
var path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs')
const multer = require('multer');

const upload = multer({dest: __dirname + '/uploads/images'});

//use the application off of express.
var app = express();
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended: true}))
app.get('/location', (req, res) => {
    fs.readFile(__dirname +'/personer/personer.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const personer = JSON.parse(jsonString)
            res.send(personer)       
    } catch(err) {
            console.log('Error parsing JSON string:', err)
            
        }
    })
  });
var htmlPath = path.join(__dirname, "views")
app.use(express.static(htmlPath))
//define the route for "/"
var server = app.listen(3000, '192.168.1.109', function () {
    var host = '192.168.1.109';
    var port = server.address().port;
});
app.post('/request',(req,res) => {
    fs.writeFile(__dirname + '/personer/personer.json',JSON.stringify(req.body),function(err){
    	if(err){
    	    console.log(err)
    	}
    })
});

app.post('/upload', upload.single('photo'), (req, res) => {
});
