const  express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const axios  = require('axios').default;
 var fs = require('fs');

const parse = require('node-html-parser').parse;
// const { argv } = require('process');
 const map_api_key = "pk.eyJ1Ijoic3JhdmFuMjMwNSIsImEiOiJja2d2bjVveHowMGh2MnlwaXR0b2RobWt2In0.p1ZWDeJpP2eogH-y5PjLRQ";

const bodyParser = require('body-parser');
// const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
   app.use(express.static(path.join(__dirname, 'src')));
    res.sendFile(path.join(__dirname , "/src/index.html"));
 
  })

  app.get('/data', (req, res) => {
      res.sendFile(path.join(__dirname , "data.json"));
    })

   app.post('/', function (req, res) {
    let city = req.body.city;
    console.log(city);
    let apiKey = 'f3725f9a68fda45acadc60cd88d4ddca';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var temp;
   axios
   .get(url)
   .then(function (response) {
    temp = response;
     var celsius = temp.data.main.temp-273.15;
     var farenheit = celsius*9/5+32;
   
    console.log(celsius , farenheit);/////////////Temp
    celsius = Math.floor(celsius);
    var reading = {"city":city,
                    "value" : celsius
                 };

    let data = JSON.stringify(reading);
    fs.writeFileSync('data.json', data);
    
    res.sendFile(path.join(__dirname , "/src/index.html"));
  })
  .catch(function (error) {
    if(error.response.status==404) console.log("Sorry City is Invalid! Retry !!!");
    
    var reading = {"city":"Invalid",
                    "value" : "NA"
                 };

    let data = JSON.stringify(reading);
    fs.writeFileSync('data.json', data);

    return;
  })

  })

   

  app.listen(9000,()=>{
    console.log("Server is good..");
    })

    // f3725f9a68fda45acadc60cd88d4ddca