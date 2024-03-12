// index.js (or app.js)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const candidatesRouter = require('./routes1/candidates'); // Import candidates router

const app = express();
const PORT = 3012;

app.use(bodyParser.json());
app.use(cors());

// Route for candidate operations
app.use('/candidates', candidatesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
