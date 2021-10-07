const functions = require('firebase-functions');
const { searchAmazon } = require('unofficial-amazon-search');
const admin = require('firebase-admin');
admin.initializeApp();

exports.search = functions.https.onCall(async (data, context) => {
	let results = await searchAmazon(data.search).catch((error) => {
		functions.logger.error(error);
	});
	functions.firestore.namespace();
	admin.firestore().collection('searches').add({
		search: data.search,
	});
	functions.logger.info('Search results:');
	functions.logger.info(results);
	let url = results.searchResults[0].productUrl;
	return `https://amazon.com${url}${url.endsWith('/') ? '?' : '&'}tag=fast1020-20`;
});
