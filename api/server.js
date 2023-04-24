import { Database } from "bun:sqlite";
import { get } from "http";
var cors = require("cors");

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

async function send_sms(to, msg) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${accountSid}:${authToken}`
      ).toString("base64")}`,
    },
    body: `From=${twilioPhone}&To=${to}&Body=${encodeURIComponent(msg)}`,
  };
  const res = await fetch(
    "https://api.twilio.com/2010-04-01/Accounts/ACa6399cb836ecb1081a36eab0529d7b29/Messages.json",
    options
  )

  const res_json = await res.json()

  console.log(res_json)
}

const db = new Database("campaign-data.sqlite", { create: true });

db.run(`CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  pass_hash TEXT,
  UNIQUE(email, pass_hash)
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
app.get("/api/get-campaign-data", function (req, res) {
  // console.log(req.query)
  // const query = db;

  const campaign_query = db.query(
    `SELECT * FROM campaigns WHERE email='${req.query.email}' AND pass_hash = '${req.query.ph}'`
  );
  const campaign = campaign_query.get();

  console.log("WHAT", req.query);

  if (campaign !== null) {
    const subjects_query = db.query(
      `SELECT * FROM screening_subjects WHERE campaign_id = ${campaign.id}`
    );
    // WHERE campaign_id = ${campaign.id}`);
    const subjects = subjects_query.all();
    // const sb2 = subjects_query.get();

    // console.log(subjects)
    res.send({ subjects, campaign }).status(200);
  } else {
    res.send({ error: "not found" }).status(404);
  }
});

// POST endpoint for creating a new campaign
app.post("/api/post-new-campaign", function (req, res) {
  let campaign = req.body;
  if (req.body.email && req.body.ph && req.body.subjects) {
    console.log("New campaign request:", campaign);

    db.run(`
    INSERT INTO campaigns (email, pass_hash)
    VALUES ('${req.body.email}', '${req.body.ph}');
    `);

    const id_query = db.query(`SELECT MAX(ID) FROM campaigns;`);
    const id = id_query.get()["MAX(ID)"];
    // console.log(id)

    req.body.subjects.forEach((subject) => {
      const pin = Math.floor(1000 + Math.random() * 9000);
      db.run(`
      INSERT INTO screening_subjects (campaign_id, name, phone_number, email, pin_number, screen_status)
      VALUES (${id}, '${subject.name}', '${subject.phone}', '${subject.email}', '${pin}', "none");
      `);

      console.log(subject, pin)

      send_sms(
        `+1${subject.phone}`,
        `Hello ${subject.name}\nSign into CSA for Health Screening\nYour PIN is ${pin}\n\nhttps://old-views-like-12-38-208-106.loca.lt/form`
      );
    });

    // db.run(`
    // -- Insert user data
    // INSERT INTO screening_subjects (campaign_id, name, phone_number, email, pin_number)
    // VALUES (1, 'Martha', '03429204', 'ajdeij@djaijd.com', '0923');
    // `);

    res.send().status(201);
  } else {
    res.send("Error: malformed request. Better luck next time").status(400);
  }
});

// POST endpoint for submitting your screening results
app.post("/api/submit-screen-results", function (req, res) {
  const pin = req.body.pin;
  const name = req.body.name;
  const status = req.body.status;

  const get_id = db.query(
    `SELECT ID FROM screening_subjects WHERE name = '${name}' AND pin_number = ${pin};`
  );
  const id = get_id.get().id;

  console.log(pin, name, status, id);
  db.run(
    `UPDATE screening_subjects SET screen_status = '${status}' WHERE ID = ${id}`
  );

  res.send().status(200);
});

// Start the server
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
