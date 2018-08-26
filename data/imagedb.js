/**
 * CONEXÃO BLOB DO AZURE PARA AMARZENAMENTO DE ARQUIVOS
 */

var azure = require('azure-storage');
var uuid = require('uuid/v1');

var connection = "CHAVE PRIMARIA";
var blobService = azure.createBlobService(connection);

var saveImage = function(stream, size, callback) {

    var id = uuid();

    blobService.createBlockBlobFromStream("images", id, stream, size, err => {
        callback(err, id);
    });
};

var getImageUri = function(imageId) {
    var url = blobService.getUrl("images", imageId);
    var sas = blobService.generateSharedAccessSignature("images", imageId,
    {
        AccessPolicy: {
            Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
            Start: azure.date.minutesFromNow(-15),
            Expiry: azure.date.minutesFromNow(30)
        }
    });
    return `${url}?${sas}`;
};

module.exports = {
    saveImage: saveImage,
    getImageUri: getImageUri
};