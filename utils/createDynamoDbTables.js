const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});

const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

const params = [{
    AttributeDefinitions: [
        {
            AttributeName: "id",
            AttributeType: "S"
        },
        {
            AttributeName: "title",
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "id",
            KeyType: "HASH"
        },
        {
            AttributeName: "title",
            KeyType: "RANGE"
        }
    ],
    BillingMode: "PROVISIONED",
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    },
    TableName: "diveshop_products"
},
    {
        AttributeDefinitions: [
            {
                AttributeName: "product_id",
                AttributeType: "S"
            },
        ],
        KeySchema: [
            {
                AttributeName: "product_id",
                KeyType: "HASH"
            }
        ],
        BillingMode: "PROVISIONED",
        ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2
        },
        TableName: "diveshop_stocks"
    }];

params.forEach((param) => dynamodb.createTable(param, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Created", data);
    }
}));
