const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userName: String,
  repoUrl: String,
  repoName: String,
  watchers: Number,
  hidden: Boolean
});

let Repo = mongoose.model('Repo', repoSchema);

let accessDB = (err, param) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if (err) return console.log(err);
  var newRepo = new Repo({
    userName: param.owner.login,
    repoUrl: param.html_url,
    repoName: param.name,
    watchers: param.watchers,
    hidden: true
  });
  Repo.deleteMany({hidden: true}, (err) => {
    if (err) return console.log(err);
  })
    newRepo.save((err, newRepo) => {
      if (err) return console.log(err);
    });
}
let readAll = (callback) => {
  Repo.find({}).sort({watchers: 'descending'}).limit(25).exec((err, docs) => {
    if (err) return console.log(err);
    
    callback(null, docs);
   
  })
  
}
  

mongoose.connection.once('open', function () {
    console.log('connection has been made...');
  }).on('error', function (error) {
    console.log('connection error: ', error);
  })
module.exports = {
      accessDB: accessDB,
      readAll: readAll
    };