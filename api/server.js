import { Database } from "bun:sqlite";
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = new Database("campaign-data.sqlite", { create: true });

db.run(`CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  pass_hash TEXT
);`);

db.run(`
CREATE TABLE  IF NOT EXISTS screening_subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER,
  phone_number TEXT,
  email TEXT,
  name TEXT, 
  pin_number TEXT,
  screen_status TEXT,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);`);

app.use(bodyParser.json());

const PORT = 8000;

// GET endpoint for getting campaign data
app.get('/api/get-campaign-data', function (req, res) {
  // console.log(req.query)
  // const query = db;

  const campaign_query = db.query(`SELECT * FROM campaigns WHERE email='${req.query.email}' AND pass_hash = '${req.query.ph}'`);
  const campaign = campaign_query.get();

  console.log(req.query)

  if(campaign !== null) {
    const subjects_query = db.query(`SELECT * FROM screening_subjects`);
    // WHERE campaign_id = ${campaign.id}`);
    const subjects = subjects_query.all();
    // const sb2 = subjects_query.get();
    
    // console.log(subjects)
    res.send({subjects,campaign}).status(200);
  } else {
    res.send().status(404);
  }
});

// POST endpoint for creating a new campaign
app.post('/api/post-new-campaign', function (req, res) {
  let campaign = req.body;
  if(req.body.email && req.body.ph && req.body.subjects){
    console.log('New campaign request:', campaign);

    db.run(`
    INSERT INTO campaigns (email, pass_hash)
    VALUES ('${req.body.email}', '${req.body.ph}');
    `);

    const id_query = db.query(`SELECT MAX(ID) FROM campaigns;`);
    const id = id_query.get()["MAX(ID)"];
    console.log(id)


    req.body.subjects.forEach(subject => {
      db.run(`
      INSERT INTO screening_subjects (campaign_id, name, phone_number, email, pin_number, screen_status)
      VALUES (${id}, '${subject.name}', '${subject.phone}', '${subject.email}', '${Math.floor(1000 + Math.random() * 9000)}', null);
      `);
    });

   // db.run(`
// -- Insert user data
// INSERT INTO screening_subjects (campaign_id, name, phone_number, email, pin_number)
// VALUES (1, 'Martha', '03429204', 'ajdeij@djaijd.com', '0923');
// `);
    

    res.send().status(201);
  } else {
    res.send('Error: malformed request. Better luck next time').status(400);
  }
});

// POST endpoint for submitting your screening results
app.post('/api/submit-screen-results', function (req, res) {

});

// Start the server
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});