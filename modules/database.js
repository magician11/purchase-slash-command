const admin = require('firebase-admin');
const moment = require('moment');
const config = require('../config');

const serviceAccount = require(`../keys/${config.firebasePrivateKey}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://purchase-requests.firebaseio.com'
});

const db = admin.database();

const savePurchaseRequest = (userId, item) => {
  const ref = db.ref('/');
  const response = ref.push({
    userId,
    item,
    timestamp: moment().valueOf()
  });

  return response.key;
};

const readPurchaseRequest = async key => {
  const ref = db.ref('/');
  const snapshot = await ref.child(key).once('value');
  return snapshot.val();
};

module.exports = {
  savePurchaseRequest,
  readPurchaseRequest
};
