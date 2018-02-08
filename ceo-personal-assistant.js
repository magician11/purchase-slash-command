/*
This script checks each purchase request every x minutes.

If a decision on the purchase request has not been made
AND
Y minutes have passed since it was first requested,
then remind the CEO of that collection of purchase requests.
*/

const moment = require('moment');
const { readAllPurchaseRequests } = require('./modules/database');
const { sendDM } = require('./modules/slack');
const config = require('./config');

const checkOnPurchaseRequests = async () => {
  const purchaseRequests = await readAllPurchaseRequests();

  const purchaseRequestReminders = [];

  for (let key of Object.keys(purchaseRequests)) {
    const { timestamp, decision, item, userId } = purchaseRequests[key];

    if (!decision && moment().diff(timestamp, 'minutes') > 94) {
      purchaseRequestReminders.push({
        item,
        userId
      });
    }
  }

  sendDM(
    config.ceoId,
    'Hi! Here are purchase requests that still need a decision from you.',
    purchaseRequestReminders.map(purchaseRequest => ({
      text: `*${purchaseRequest.item}* requested by <@${
        purchaseRequest.userId
      }>`
    }))
  );
};

checkOnPurchaseRequests();
