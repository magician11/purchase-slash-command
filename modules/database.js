const admin = require('firebase-admin');
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
    item
  });

  return response.key;
};

module.exports = {
  savePurchaseRequest
};
