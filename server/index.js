const express = require('express');
var bodyParser = require('body-parser')
let app = express();
let getRepos = require('../helpers/github.js');
let db = require('../database/index.js');
app.use(express.static(__dirname + '/../client/dist'));
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
    
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getRepos.getReposByUsername(req.body.term, (err, data) => {
    console.log('error', err);
    // console.log('repos body: ', data.body);
    if(err) {
      res.status(500);
      res.send(err);
    } else {
      var array = JSON.parse(data.body);
      for(let i = 0; i < array.length; i++){
        db.accessDB(null, array[i]);
      }
      res.status(200).send();
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
    db.readAll((err, docs) => {
      if(err){
        res.status(500);
        res.send(err);
      }else {
        
        res.status(200);
        res.send(docs);
      }
    })
    
    
    
    
    
 


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

