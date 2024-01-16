const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const recordId = event.queryStringParameters.id;
    const requestBody = JSON.parse(event.body);

    const params = {
        TableName: 'userData',
        Key: {
            userId: recordId,
        },
        UpdateExpression: 'SET #firstName = :firstName, #lastName = :lastName, #email = :email, #phone = :phone',
        ExpressionAttributeNames: {
            '#firstName': 'firstName',
            '#lastName': 'lastName',
            '#email': 'email',
            '#phone': 'phone',
        },
        ExpressionAttributeValues: {
            ':firstName': requestBody.firstName,
            ':lastName': requestBody.lastName,
            ':email': requestBody.email,
            ':phone': requestBody.phone,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const updatedRecord = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(updatedRecord.Attributes),
        };
    } catch (error) {
        console.error('Error updating record:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

