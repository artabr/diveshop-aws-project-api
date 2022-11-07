const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});
const s3 = new AWS.S3();
const sqs = new AWS.SQS();
const csv = require('csv-parser');

function parseFile(fileName) {
    const s3Params = {
        Bucket: process.env.UploadBucket,
        Key: fileName,
    }

    return new Promise((resolve) => {
        let results = [];
        s3.getObject(s3Params).createReadStream().pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                return resolve(results)
            });
    });
}

module.exports.importFileParser = async (event) => {
    try {
        const results = await parseFile(event.Records[0].s3.object.key)

        for (const result of results) {
            await sqs.sendMessage({
                QueueUrl: process.env.SQS_URL,
                MessageBody: JSON.stringify(result),
            }).promise();
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({message: `All files been processed.`}),
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
