const { sendDM } = require('../modules/slack');
const {
  readPurchaseRequest,
  recordPurchaseRequestDecision
} = require('../modules/database');

module.exports = app => {
  app.post('/action', async (req, res) => {
    const interactiveMessage = JSON.parse(req.body.payload);
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

    // record decision of CEO in database
    recordPurchaseRequestDecision(
      databaseKey,
      interactiveMessage.actions[0].value
    );

    // read purchase request from database using key
    const purchaseRequest = await readPurchaseRequest(databaseKey);

    // send the original purchase requester feedback on the decision
    sendDM(
      purchaseRequest.userId,
      `Hi! Your purchase request for ${purchaseRequest.item} was ${
        requestApproved ? 'approved' : 'denied'
      }.`
    );
  });
};
