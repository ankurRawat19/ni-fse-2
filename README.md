# ni-fse-2
This Repository contains code for Frontend (A WebForm created in React) inside frontend directory and Backend (Lambda Functions) inside backend directory.

The React Web Form is a React App with 3 routes :
  1. '/' : this page will show up a form to add a user to dynamodb. It performs all form validations and once             valid details has been entered an api call is made to '/save/' in AWS ApiGateway which invokes                     'saveFormData' lambdaFunction.
  2. '/records' : this page will display all data in dynamoDB in tabular form via making an api call to '/id'             which then invokes 'getAllRecords' lambdaFunction.
  3. '/records/:id' : on clicking any user in previous table will open this page which contains all details of the        user via making an api call to '/id_recordId'(GET) which invokes 'getRecordDetails' lambdaFunction. On             clicking edit button user can edit the details and clicking save button will make an api call to 
      '/id_recordId'(PUT) in AWS apiGateWay which invokes 'updateUser' lambda function.
  4. The react app user metrial-ui components.
The React App is statically hosted in AWS S3 service (Link : http://ni-fse.s3-website.eu-north-1.amazonaws.com/ )

To install frontend locally -
  1. git clone the repository
  2. cd frontend
  3. run npm install
  4. run npm start

DynamoDB used has name 'userData' having 'userId' as primarykey

There are 4 Lambda functions used 
  1. getAllRecords : to get all users from dynamoDB
  2. saveFormData : to add a user in dynamoDB
  3. getRecordDetails : to get a user for a specific id
  4. updateUser : to update user of specific id

AWS apiGateway has 4 endpoints as follow : 
  1. GET '/id' : to get all users
  2. POST '/save' : to add a user
  3. GET '/id_recordId' : to get a specific user
  4. PUT '/id_recordId' : to update a specific user

AWS configurations used : 
  IAM user has following Permission policies : 
    1. AmazonDynamoDBFullAccess	
    2. AWSLambdaBasicExecutionRole
    3. AWSLambdaDynamoDBExecutionRole	
    4. AWSLambdaExecute

CloudWatch Logs has 30 days retention policy

For serverless framework serverless.yml file is included inside 'backend' directory

Screenshots of UI working has been added inside 'screenshots' directory.
