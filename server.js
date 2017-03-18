const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const app = express();
const port = 8000;
const db = massive.connectSync({
      //                       username      pw   postgres url / database name
  connectionString: 'postgres://startrekapi:tester@localhost/startrekapi',
});

app.set('db', db)

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
module.exports = app;

const peopleCtrl = require('./controllers/peopleCtrl')
app.get('/api/people', peopleCtrl.getPeople)

app.post('/api/people',peopleCtrl.postPerson);

app.delete('/api/deletePerson/:id', peopleCtrl.deletePerson)



app.listen(port, () => console.log(`listening on port ${port}` ));
