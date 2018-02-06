const admin = require('firebase-admin');
const config = require('../config');

const serviceAccount = require(`../keys/${config.firebasePrivateKey}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://purchase-requests.firebaseio.com'
});

const db = admin.database();

const savePurchaseRequest = async (userId, item) => {
  var ref = db.ref('/');
  ref.push({
    userId,
    item
  });
};

module.exports = {
  savePurchaseRequest
};
