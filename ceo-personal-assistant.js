const moment = require('moment');
const { readAllPurchaseRequests } = require('./modules/database');

const checkOnPurchaseRequests = async () => {
  const purchaseRequests = await readAllPurchaseRequests();

  for (let key of Object.keys(purchaseRequests)) {
    const { timestamp, decision, item } = purchaseRequests[key];
    console.log(
      `The purchase for ${item} was made ${moment().diff(
        timestamp,
        'minutes'
      )} minutes ago, and the CEO ${decision} this.`
    );
  }
};

checkOnPurchaseRequests();
