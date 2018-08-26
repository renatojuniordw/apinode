/**
 * CONEXÃO COM COSMOS DB DO AZURE
 */

var sampleData = require('./sampleCourse');

var docdb = require('documentdb'),
    async = require('async');

var config = {
    host: 'host',
    auth: {
        masterKey: 'masterKey'
    }
};

var client = new docdb.DocumentClient(config.host, config.auth);
var coursesLink = docdb.UriFactory.createDocumentCollectionUri('nmBanco', 'nmCollection');

var createCourses = function (callback) {
    var documents = [];
    async.forEachOf(sampleData, (course, key, next) => {
        client.createDocument(coursesLink, course, (err, document) => {
            if (err) return next(err);
            documents.push(document);
            next();
        });
    }, err => callback(err, documents));
};

var queryCourses = function (callback) {

    var querySpec = {
        query: 'SELECT * FROM c',
        parameters: []
    };

    client.queryDocuments(coursesLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

module.exports = {
    createCourses: createCourses,
    queryCourses: queryCourses
};
