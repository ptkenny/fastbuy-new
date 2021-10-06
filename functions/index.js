const functions = require('firebase-functions');
const amazon = require('paapi5-nodejs-sdk');

const amazonClient = amazon.ApiClient.instance;
defaultClient.accessKey = functions.config().amazon.id;
defaultClient.secretKey = functions.config().amazon.secret;
// awsTag: 'fast1020-20',

exports.search = functions.https.onRequest(async (request, response) => {
	functions.logger.info('Searching now....');

	response.send('amazon search response');
});
