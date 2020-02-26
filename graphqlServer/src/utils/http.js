/**
 * @author closertb
 * @homepage https://github.com/closertb/
 * @since 2017-06-15
 */

const axios = require('axios');

const http = axios.create({
	baseURL: '/',
	headers: { 'Cache-Control': 'no-cache' }
});

module.exports = http;
