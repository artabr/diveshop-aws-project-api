const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});
const s3 = new AWS.S3();
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
                console.log(results);
                return resolve('Success: ' + results)
            });
    });
}

module.exports.importFileParser = async (event) => {
    try {
        let tasks = []
        event.Records.forEach((record) => {
            tasks.push(parseFile(record.s3.object.key))
        });

        await Promise.all(tasks);

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
