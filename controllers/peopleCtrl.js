var app = require('../server.js');
var db = app.get('db');

module.exports = {
  getPeople: function(req, res) {
    //Other Method
    // db.run('select * from people', function(err, response){
    //   res.send(response);
    // })
    db.readList(function(dbError, dbResults){
      if (dbError) {
        return console.log(dbError)
      }
      res.send({results: dbResults});
    });
  },

  postPerson: function(req, res) {
    console.log(1, req)
    db.people.insert({first_name: req.body.firstName, last_name: req.body.lastName, rank: req.body.rank},
      function(dbErr, dbRes){
        if (dbErr) {
          console.log(dbErr)
        }
        res.send({results: dbRes})
      })
    },

    deletePerson: function(req, res) {
      console.log(req.params)
      db.people.destroy({id: req.params.id}, function(dbErr, dbRes) {
        if (dbErr) {
          return dbErr;
        }
        return res.status(200).send(dbRes);
      })
    }
}
