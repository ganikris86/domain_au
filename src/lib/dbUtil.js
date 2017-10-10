'use strict';

function dbUtil() {
}

module.exports = dbUtil;

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var logger = require('../lib/logUtil');
var Q = require('q');

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db_user = 'admin';
var db_pwd = 'Protect$1';
var mongoDBURI = 'mongodb://'+db_user+':'+db_pwd+'@ds113435.mlab.com:13435/domain_au';
dbUtil.HCARD_COLLECTION = 'hCard';

/**
 * Get connection from db
 */
dbUtil.getConnection = function () {
	var d = Q.defer();
    mongodb.MongoClient.connect(mongoDBURI, function (err, database) {
	  logger.msg('INFO', 'index(Main)', '', 'dbUtil', 'get Connection', 'MongoDB: In getConnection...');
	  if (err) {
		logger.msg('ERROR', 'index(Main)', '', 'dbUtil', 'getConnection', 'MongoDB: Error in getConnection - ' + err);
		d.reject(err);
		//process.exit(1);
	  } else {
		// Save database object from the callback for reuse.
		logger.msg('INFO', 'index(Main)', '', 'dbUtil', 'get Connection', 'MongoDB: Database connection ready');
		d.resolve(database);
	  }
	});
	return d.promise;
};
