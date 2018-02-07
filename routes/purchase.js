const { sendDM } = require('../modules/slack');
const { savePurchaseRequest } = require('../modules/database');
const config = require('../config');

module.exports = app => {
  app.post('/purchase', async (req, res) => {
    const { text, user_id } = req.body;
    res.json({
      text: `Thanks for your purchase request of *${text}*. We will message the CEO now for authorisation.`
    });

    // save purchase request to database
    const key = savePurchaseRequest(user_id, text);
    console.log(key);

    // send a message to the CEO.. asking them to authorise the purchase request
    sendDM(config.ceoId, `Hi! <@${user_id}> would like to order *${text}*.`, [
      {
        text: 'Do you authorise this purchase request?',
        callback_id: 'purchase_request',
        actions: [
          {
            name: 'auth_button',
            text: 'Yes I approve',
            type: 'button',
            value: 'approved'
          },
          {
            name: 'auth_button',
            text: 'No',
            type: 'button',
            value: 'declined'
          }
        ]
      }
    ]);
  });
};
