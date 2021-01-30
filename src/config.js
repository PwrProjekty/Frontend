import ENV from '@/env';

const config = {};

if (ENV === 'dev') {
  config.apiPath = 'http://localhost:5000';
} else {
  config.apiPath = 'https://gotpttk.herokuapp.com';
}

export default config;
