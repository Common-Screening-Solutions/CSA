import { Database } from "bun:sqlite";
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = new Database(":memory:");
const create_tables = db.query(`
CREATE TABLE Campaigns (
  
);`).run();

app.use(bodyParser.json());

const PORT = 8000;

// GET endpoint for getting campaign data
app.get('/api/get-campaign-data', function (req, res) {
  console.log(req.query)
  const query = db.query(`select '${req.query.id}' as message;`);
  res.send(query.get().message);
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