const express = require('express');
const bodyParser = require('body-parser');
const { sendDM } = require('./modules/slack');
const config = require('./config');

const app = express();

// allow us to easily process POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/purchase', async (req, res) => {
  const { text, user_id } = req.body;
  res.json({
    text: `Thanks for your purchase request of *${
      text
    }*. We will message the CEO now for authorisation.`
  });

  // send a message to the CEO.. asking them to authorise the purchase request
  sendDM(config.ceoId, `Hi! <@${user_id}> would like to order *${text}*.`, [
    {
      text: 'Do you authorise this purchase request?',
      actions: [
        {
          name: 'purchase_request',
          text: 'Yes I approve',
          type: 'button',
          value: 'approved'
        },
        {
          name: 'purchase_request',
          text: 'No',
          type: 'button',
          value: 'declined'
        }
      ]
    }
  ]);
});

const PORT = 9647;
app.listen(PORT, () => {
  console.log(`Slack bot server has started on port ${PORT}`);
});
