const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});

const generatePolicy = (principalId, resource, effect) => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                }
            ]
        }
    };
};

module.exports.basicAuthorizer = async (event) => {
    console.log('Received event', JSON.stringify(event));

    try {
        const authorizationToken = event.headers.authorization;

        const encodedCreds = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCreds, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const username = plainCreds[1];
        const password = plainCreds[1];

        console.log(`username: ${username} and password: ${password}`);

        const storedPassword = process.env.artabr;

        const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow'
        const policy = generatePolicy(encodedCreds, event.routeArn, effect)
        console.log(policy)

        if (effect === 'Allow') {
            console.log('Allowing access.');
        } else {
            console.log('Denying access.');
        }

        return policy;
    } catch (e) {
        console.log('Error happened', e);
    }
};
