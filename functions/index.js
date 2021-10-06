const functions = require('firebase-functions');

const { searchAmazon } = require('unofficial-amazon-search');

exports.search = functions.https.onRequest(async (request, response) => {
	let data = await searchAmazon('printer').catch((error) => {
		functions.logger.error(error);
	});
	functions.logger.info(data);
	let url = `https://amazon.com${data.searchResults[0].productUrl}&tag=fast1020-20`;
	response.send({ data: url });
});
