// import dotenv from 'dotenv';
import dotenv from 'dotenv';

console.log(dotenv.parse, 'parseee');
dotenv.config();

export const environment = {
  production: false,
  apiKey: process.env['API_KEY'],
  baseUrl: process.env['BASE_URL'],
};
