const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// allow us to easily process POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/purchase', async (req, res) => {
  console.log(req.body);
  res.json({
    text: 'Thanks for your purchase request!'
  });

  // send a message to the CEO.. asking them to authorise the purchase request
});

const PORT = 9647;
app.listen(PORT, () => {
  console.log(`Slack bot server has started on port ${PORT}`);
});
