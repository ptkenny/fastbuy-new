const functions = require('firebase-functions');
const { searchAmazon } = require('unofficial-amazon-search');

exports.search = functions.https.onCall(async (data, context) => {
	let results = await searchAmazon(data.search).catch((error) => {
		functions.logger.error(error);
	});
	functions.logger.info(results);
	let url = results.searchResults[0].productUrl;
	return `https://amazon.com${url}${url.endsWith('/') ? '?' : '&'}tag=fast1020-20`;
});
