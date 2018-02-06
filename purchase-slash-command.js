const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// allow us to easily process POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/purchase')(app);
require('./routes/action')(app);

const PORT = 9647;
app.listen(PORT, () => {
  console.log(`Slack bot server has started on port ${PORT}`);
});
