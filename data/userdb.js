/**
 * CONEXÃO COM O SQL SERVE DO AZURE
 */


var tedious = require('tedious');

var Connection = tedious.Connection;
var Request = tedious.Request;

var config = {
    userName: 'userName',
    password: '@password',
    server: 'server.database.windows.net',
    options: {
        database: 'database',
        encrypt: true,
        rowCollectionOnRequestCompletion: true //TRAZ DADOS DENTRO DE UM ARRAY
    }
};

var createUsers = (data, callback) => {
    var connection = new Connection(config);
    connection.on('connect', (err) => {
        if (err) {
            callback(err);
        } else {
            var request = new Request(
                `INSERT INTO [TABLE] (name, email) values ('${data.name}', '${data.email}')`,
                (err, rowCount) => {
                    callback(err, rowCount);
                }
            );
            connection.execSql(request);
        }
    });
}

var queryUsers = (callback) => {
    var connection = new Connection(config);
    connection.on('connect', (err) => {
        if (err) {
            callback(err)
        } else {
            var request = new Request(
                `SELECT * FROM [TABLE]`,
                (err, rowCount, row) => {
                    callback(err, rowCount, row);
                }
            );
            connection.execSql(request);
        }
    })
};

module.exports = {
    createUsers: createUsers,
    queryUsers: queryUsers
}