var express = require('express');
var server = express();
var path = require('path');
var fs = require('fs');

server.get('/', function(req, res) {
  res.send("<h1>It Works!</h1>");
});

server.use(express.static('users'));

server.get('/:user/:api/:data', function(req, res){
  var user = req.params.user;
  var apiCollection = req.params.api;
  var apiData = req.params.data;

  var url = path.join(__dirname, "users", user, apiCollection, apiData+".json");

  console.log("File path = " + url + "\n");

  fs.stat(url, function(err, stats){

    var jsonData = {};

    try{
      if(stats && stats.isFile())
      {
        jsonData = JSON.parse(fs.readFileSync(url, 'utf8'));
        console.log(stats.isFile());
        console.log(jsonData);

        res.send(jsonData);
      }
      else{
        res.send(" <h1>No API Found</h1><h3> at /"+ user +"/"+ apiCollection+ "/" + apiData +"/</h3>");
      }
    }
    catch(e) {
      res.send("<h1>Could not get api data because</h1><p> "+ e.message + " </p> <h3>Please check your uploaded JSON data");
    }
  });
});

console.log("Server running on port 4000. Press CTRL + C to exit....\n");
server.listen(4000);
