import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  production: false,
  apiKey: process.env['API_KEY'],
  baseUrl: process.env['BASE_URL'],
};
