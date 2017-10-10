'use strict';

var logger = require('../lib/logUtil');
var dbUtil = require('../lib/dbUtil');
var constants = require('../lib/constants');
var indexModel = require('../models/Index');
var Q = require('q');

function spaService() {
}

module.exports = spaService;


/**
 * Get the last saved hCard
 * @param req
 * @param res
 */
spaService.getHCard = function (req, res) {
    logger.msg('INFO', 'spaService', '', '', 'getHCard', 'Get the last saved hCard');

    var d = Q.defer();

    dbUtil.getConnection()
        .then(function (dbConn) {
			logger.msg('INFO', 'spaService', '', '', 'getHCard', 'Got the dbConnection');
			return indexModel.getHCard(dbConn, dbUtil.HCARD_COLLECTION);
        })
        .then(function (response) {
            d.resolve(response);
        }, function (err) {
            logger.msg('ERROR', 'spaService', '', '', 'getHCard', 'Error when getting the latest hCard - ' + err);
			d.reject(err);
        });

    return d.promise;
};

/**
 * Create a new hCard
 * @param req
 * @param res
 */
spaService.createHCard = function (req, res) {
    logger.msg('INFO', 'spaService', '', '', 'createHCard', 'Create a new hCard');

    var d = Q.defer();

	var inputHCard = req.body;

    dbUtil.getConnection()
        .then(function (dbConn) {
			logger.msg('INFO', 'spaService', '', '', 'createHCard', 'Got the dbConnection');
			return spaService.saveHCard(dbConn, dbUtil.HCARD_COLLECTION, inputHCard);
        })
        .then(function (response) {
            d.resolve('');
        }, function (err) {
            logger.msg('ERROR', 'spaService', '', '', 'createHCard', 'Error during creation of new hCard - ' + err);
			d.reject(err);
        });

    return d.promise;
};

/**
 * Save the input hCard
 * @param dbConn
 * @param collectionName
 * @param inputHCard
 */
spaService.saveHCard = function (dbConn, collectionName, inputHCard) {
    logger.msg('INFO', 'spaService', '', '', 'saveHCard', 'Save the input hCard');
    var d = Q.defer();

	spaService.constructHCard(dbConn, inputHCard)
        .then(function (hCard) {
			return indexModel.storeHCard(dbConn, dbUtil.HCARD_COLLECTION, hCard);
        })
        .then(function (response) {
            d.resolve('');
        }, function (err) {
            logger.msg('ERROR', 'spaService', '', '', 'saveHCard', 'Error when saving hCard - ' + err);
			d.reject(err);
        });

    return d.promise;
};

/**
 * Construct hCard object to save in the database
 * @param dbConn
 * @param inputHCard
 */
spaService.constructHCard = function (dbConn, inputHCard) {
    logger.msg('INFO', 'spaService', '', '', 'constructHCard', 'Construct hCard object to save in the database');
    var d = Q.defer();
	
	if (inputHCard) {
		var constructedHCard = {
			//'_id': spaService.getNextSequenceNumber(dbConn, constants.SEQ_HCARD_ID),
			'givenName': inputHCard.givenName,
			'surname': inputHCard.surname,
			'email': inputHCard.email,
			'phone': inputHCard.phone,
			'houseNumber': inputHCard.houseNumber,
			'street': inputHCard.street,
			'suburb': inputHCard.suburb,
			'state': inputHCard.state,
			'postcode': inputHCard.postcode,
			'country': inputHCard.country
		};

		d.resolve(constructedHCard);
	} else {
		d.resolve('');
	}

    return d.promise;
};

/**
 * Get the next sequence number
 * @param dbConn
 * @param sequenceName
 * @returns {number|seq}
 */
spaService.getNextSequenceNumber = function (dbConn, sequenceName) {
   logger.msg('INFO', 'spaService', '', '', 'getNextHCardId', 'Get the next sequence number - ' + sequenceName);

   var seqDocument = dbConn.counter.findAndModify(
          {
            query: { _id: sequenceName },
            update: { $inc: { seq: 1 } },
            new: true,
			upsert: true
          }
   );

   logger.msg('INFO', 'spaService', '', '', 'getNextHCardId', 'seqDocument - ' + JSON.stringify(seqDocument));

   return seqDocument.seq;
};
