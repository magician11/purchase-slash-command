const { sendDM } = require('../modules/slack');
const { readPurchaseRequest } = require('../modules/database');

module.exports = app => {
  app.post('/action', async (req, res) => {
    const interactiveMessage = JSON.parse(req.body.payload);
    console.log(interactiveMessage);
    const requestApproved = interactiveMessage.actions[0].value === 'approved';
    const databaseKey = interactiveMessage.actions[0].name;
    const originalTextMessage = interactiveMessage.original_message.text;

    // sending the CEO feedback on what they decided
    res.json({
      text: originalTextMessage,
      attachments: [
        {
          text: requestApproved
            ? 'You approved this purchase request.'
            : 'You denied this purchase request.'
        }
      ]
    });

    // read purchase request from database using key
    const purchaseRequest = await readPurchaseRequest(databaseKey);
    console.log('purchaseRequest from Firebase...');
    console.log(purchaseRequest);

    // send the original purchase requester feedback on the decision
    const matches = originalTextMessage.match(/@(.+)>.+\*(.+)\*/);
    console.log(matches);
    sendDM(
      matches[1],
      `Hi! Your purchase request for ${matches[2]} was ${
        requestApproved ? 'approved' : 'denied'
      }.`
    );
  });
};
