/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

var spaService = require('../../services/spaService');
var indexModel = require('../../models/Index');

var Q = require('q');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var sinon = require('sinon');

var sinonChai = require('sinon-chai');
chai.use(sinonChai);
require('sinon-as-promised');

//========================================================================================TestCases starts below

describe('spaService::SPA Service TestSuite', () => {

    let logUtilStub;

    before(function (done) {
        // Stub the logUtil to ensure that log details are not printed while executing unit tests
        let logUtil = require('../../lib/logUtil');
        logUtilStub = sinon.stub(logUtil, 'msg',
            function (level, controller, model, lib, method, info) {
                return '';
            });
        done();
    });

    after(function (done) {
        logUtilStub.restore();
        done();
    });

    describe('Method: constructHCard() - Construct hCard object to save in the database ', () => {

        it('should return constructed object', (done) => {

            var dbConn = '';
            var inputHCard = {
                'givenName': 'Gan',
                'surname': 'Rad',
                'email': 'g.r@w.com',
                'phone': '1212131',
                'houseNumber': '12',
                'street': 'Street 15',
                'suburb': 'St Leo',
                'state': 'NSW',
                'postcode': '1213234',
                'country': 'Australia'
            };
            var expectedHCardResponse = {
                'givenName': 'Gan',
                'surname': 'Rad',
                'email': 'g.r@w.com',
                'phone': '1212131',
                'houseNumber': '12',
                'street': 'Street 15',
                'suburb': 'St Leo',
                'state': 'NSW',
                'postcode': '1213234',
                'country': 'Australia'
            };

            spaService.constructHCard(dbConn, inputHCard)
                .then((response) => {
                    expect(expectedHCardResponse).to.deep.equal(response);
                    done();
                });

        }); //end it

        it('should return constructed object as empty object', (done) => {

            var dbConn = '';
            var inputHCard = {};
            var expectedHCardResponse = '';

            spaService.constructHCard(dbConn, inputHCard)
                .then((response) => {
                    expect(expectedHCardResponse).to.not.equal(response);
                    done();
                });

        }); //end it


    }); //end describe for Method: constructHCard()

    describe('Method: saveHCard() - Save the input hCard ', () => {

        it('should return response as empty', (done) => {

            var dbConn = '';
            var collectionName = 'TEST';
            var inputHCard = {
                'givenName': 'Gan',
                'surname': 'Rad',
                'email': 'g.r@w.com',
                'phone': '1212131',
                'houseNumber': '12',
                'street': 'Street 15',
                'suburb': 'St Leo',
                'state': 'NSW',
                'postcode': '1213234',
                'country': 'Australia'
            };
            var expectedResponse = '';

            let stubStoreHCard = sinon.stub(indexModel, 'storeHCard');
            stubStoreHCard.resolves('');

            spaService.saveHCard(dbConn, collectionName, inputHCard)
                .then((response) => {
                    expect(expectedResponse).to.deep.equal(response);
                    expect(indexModel.storeHCard).to.have.been.calledOnce;
                    stubStoreHCard.restore();
                    done();
                });

        }); //end it



    }); //end describe for Method: saveHCard()

}); //end describe


