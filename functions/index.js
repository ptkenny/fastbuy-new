const functions = require('firebase-functions');
const { searchAmazon } = require('unofficial-amazon-search');
const admin = require('firebase-admin');
admin.initializeApp();

exports.search = functions.https.onCall((data, context) => {
	admin.firestore().collection('searches').add({
		search: data.search,
		timestamp: admin.firestore.FieldValue.serverTimestamp(),
	});
	return new Promise(async (resolve, reject) => {
		let results = await searchAmazon(data.search).catch((error) => {
			functions.logger.error(error);
			reject(error);
		});
		let url = results.searchResults[0].productUrl;
		resolve(`https://amazon.com${url}${url.endsWith('/') ? '?' : '&'}tag=fast1020-20`);
	});
});
