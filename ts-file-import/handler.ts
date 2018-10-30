import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import sshkey from './sshkey.pem';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };



  cb(null, response);
}

console.log(sshkey);
