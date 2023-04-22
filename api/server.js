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
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);`);

// db.run(`
// INSERT INTO campaigns (email, pass_hash)
// VALUES ('dnl@dlnd.org', '321312312324233423');
// `);

// db.run(`
// -- Get the ID of the newly added campaign
// SELECT id FROM campaigns WHERE email = 'dnl@dlnd.org';
// `);

// db.run(`
// -- Insert user data
// INSERT INTO screening_subjects (campaign_id, name, phone_number, email, pin_number)
// VALUES (1, 'Martha', '03429204', 'ajdeij@djaijd.com', '0923');
// `);

// db.run(`
// INSERT INTO screening_subjects (campaign_id, name, phone_number, email, pin_number)
// VALUES (1, 'Mart', '034234', 'dsaij@dd.com', '1234');
// `);

app.use(bodyParser.json());

const PORT = 8000;

// GET endpoint for getting campaign data
app.get('/api/get-campaign-data', function (req, res) {
  // console.log(req.query)
  // const query = db;

  const campaign_query = db.query(`SELECT * FROM campaigns WHERE email='${req.query.email}' AND pass_hash = '${req.query.ph}'`);
  const campaign = campaign_query.get();

  if(campaign !== null) {
    const subjects_query = db.query(`SELECT * FROM screening_subjects`);
    // WHERE campaign_id = ${campaign.id}`); 
    const subjects = subjects_query.all();
    // const sb2 = subjects_query.get();
    
    // console.log(subjects)
    res.send(subjects).status(200);
  } else {
    res.send("").status(404);
  }
});

// POST endpoint for creating a new campaign
app.post('/api/post-new-campaign', function (req, res) {
  let campaign = req.body;
  console.log('New campaign:', campaign);
  res.send('Campaign created successfully');
});

// Start the server
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});