const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});
const s3 = new AWS.S3();

module.exports.importProductsFile = async (event) => {
    try {
        const randomID = uuid();
        const Key = `products-file-${randomID}.jpg`
        const queryParams = event.queryStringParameters;
        const { name } = queryParams;

        const s3Params = {
            Bucket: process.env.UploadBucket,
            Key,
            ContentType: 'image/jpeg',
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                uploadURL: s3.getSignedUrl("putObject", s3Params),
                photoFilename: Key,
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
