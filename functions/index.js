const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.logVisitor = functions.https.onRequest((req, res) => {
  const visitorInfo = {
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    userAgent: req.headers["user-agent"],
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  db.collection("visitors")
      .add(visitorInfo)
      .then(() => {
        res.status(200).send("Visitor logged successfully.");
      })
      .catch((error) => {
        res.status(500).send("Error logging visitor: " + error);
      });
});
