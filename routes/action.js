const { sendDM } = require('../modules/slack');

module.exports = app => {
  app.post('/action', async (req, res) => {
    const interactiveMessage = JSON.parse(req.body.payload);
    console.log(interactiveMessage);
    const requestApproved = interactiveMessage.actions[0].value === 'approved';
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
