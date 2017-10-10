'use strict';

var IndexModel = require('../models/index');
var spaService = require('../services/spaService');
var logger = require('../lib/logUtil');
//var React = require('react');
// Our bundle expects React to be a global
//global.React = React;
//var hCardComponent = require('./public/js/main.js').default;

module.exports = function (router) {

    var model = new IndexModel();

    /**
     * The default GET method which gets invoked when application is launched
     */
    router.get('/', function (req, res) {
        logger.msg('INFO', 'index', '', '', 'createHCard', 'GET /');
		spaService.getHCard(req, res)
			.then(function (response) {
			    logger.msg('INFO', 'index', '', '', 'getHCard', 'Successfully retrieved hCard');
				model.hCardInfo = response;
				res.render('index', model);
			}, function (err) {
                logger.msg('ERROR', 'index', '', '', 'getHCard', 'Error in getHCard - ' + err);
		        res.render('index', err);
            });

    });

    /**
     * The POST method which is invoked when creating a new hCard
     */
    router.post('/submit', function (req, res) {
        logger.msg('INFO', 'index', '', '', 'createHCard', 'POST /submit');
		logger.msg('INFO', 'index', '', '', 'createHCard', 'req.body-'+JSON.stringify(req.body));
		spaService.createHCard(req, res)
			.then(function (response) {
			    logger.msg('INFO', 'index', '', '', 'createHCard', 'Success createHCard');
				return spaService.getHCard(req, res);
			})
			.then(function (response) {
			    logger.msg('INFO', 'index', '', '', 'createHCard', 'Successfully retrieved hCard');
				model.hCardInfo = response;
				res.render('index', model);
			}, function (err) {
                logger.msg('ERROR', 'index', '', '', 'createHCard', 'Error in createHCard - ' + err);
		        res.render('index', model);
            });

    });

};
