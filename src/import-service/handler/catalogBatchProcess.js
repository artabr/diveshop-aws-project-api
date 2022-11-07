const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});
const {v4: uuid} = require('uuid');
const sns = new AWS.SNS();

const documentClient = new AWS.DynamoDB.DocumentClient();


module.exports.catalogBatchProcess = async (event) => {
    try {
        for (const record of event.Records) {
            console.log('Message Body -->  ', record.body);
            const item = await JSON.parse(record.body)

            const id = uuid();
            await documentClient.put({
                TableName: "diveshop_products",
                Item: {
                    id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    image: item.image
                },
            }).promise();
            await documentClient.put({
                TableName: "diveshop_stocks",
                Item: {
                    product_id: id,
                    count: item.count ?? 1,
                },
            }).promise();
        }

        console.log("TOPIC ARN:", process.env.TopicArn)

        const snsParams = {
            TopicArn: 'arn:aws:sns:eu-central-1:659635361782:createProductTopic',
            Subject: 'Products processed.',
            Message: `Products processed: ${JSON.stringify(event.Records)}`,
        };

        await sns.publish(snsParams).promise();

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
