const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { firstName, lastName, email, phone, userId } = requestBody;
    console.log()
    if (!firstName || !lastName || !email || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    const params = {
      TableName: 'userData',
      Item: {
        userId,
        firstName,
        lastName,
        email,
        phone,
      },
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User added successfully' }),
    };
  } catch (error) {
    console.error('Error adding user to DynamoDB:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

