'use strict';

function Index() {
    return {
		'firstName': '',
		'lastName': ''
	};
}

module.exports = Index;

var Q = require('q');
var logger = require('../lib/logUtil');


/**
 * Store input hCard in database
 * @param dbConn
 * @param collectionName
 * @param hCardObj
 */
Index.storeHCard = function (dbConn, collectionName, hCardObj) {
    logger.msg('INFO', 'spaService', 'indexModel', '', 'storeHCard', 'Store input hCard in database');
    var d = Q.defer();

    dbConn.collection(collectionName).insertOne(hCardObj, function(err, doc) {
		if (err) {
		  logger.msg('ERROR', 'spaService', 'indexModel', '', 'storeHCard', 'Error when storing hCard - ' + err);
		  d.reject(err);
		} else {
		  logger.msg('INFO', 'spaService', 'indexModel', '', 'storeHCard', 'Successfully stored hCard - ' + doc.ops[0]);
		  d.resolve('');
		}
	});

    return d.promise;
};

/**
 * 'Get the latest hCard from database
 * @param dbConn
 * @param collectionName
 */
Index.getHCard = function (dbConn, collectionName) {
    logger.msg('INFO', 'spaService', 'indexModel', '', 'getHCard', 'Get the latest hCard from database');
    var d = Q.defer();

	dbConn.collection(collectionName).find({}).sort({_id:-1}).limit(1).toArray(function(err, docs) {
		if (err) {
		  logger.msg('ERROR', 'spaService', 'indexModel', '', 'getHCard', 'Error when retrieving hCard - ' + err);
		  d.reject(err);
		} else {
		  logger.msg('INFO', 'spaService', 'indexModel', '', 'getHCard', 'Successfully retrieved hCard - ' + JSON.stringify(docs[0]));
		  d.resolve(docs[0]);
		}
	});

    return d.promise;
};
