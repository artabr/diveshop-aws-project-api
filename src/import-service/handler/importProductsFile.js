const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});
const {v4: uuid} = require('uuid');
const s3 = new AWS.S3();

module.exports.importProductsFile = async () => {
    try {
        const randomID = uuid();
        const fileName = `products-file-${randomID}.csv`

        const s3Params = {
            Bucket: process.env.UploadBucket,
            Key: fileName,
            ContentType: 'text/csv',
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                uploadURL: s3.getSignedUrl("putObject", s3Params),
                csvFilename: fileName,
            }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({message: `ERROR: ${e}`}),
        };
    }
};
