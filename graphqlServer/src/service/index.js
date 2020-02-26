const qs = require('querystring');
const http = require('../utils/http');

function getUserById(id) {
  return http.get(`http://127.0.0.1:4001/users/${id}`);
}

async function getUser(userId) {
  return await http.get(`http://127.0.0.1:4001/users/${userId}`).then(res => res.data);
}

async function getUsers(queryParams, pageNum, pageSize) {

  const params = qs.stringify({ ...queryParams, pageNum, pageSize });
  return await http.get(`http://127.0.0.1:4001/users?${params}`).then(res => res.data);
}

async function getUserMixNick(userId) {
  return await http.get(`http://127.0.0.1:4001/api/${userId}/nickName/`).then(res => res.data);
}

// 获取我曾度过的书籍
async function getTopBooks(top) {
  return await http.get(`https://douban.uieee.com/v2/book/search?q=%E7%BC%96%E7%A8%8B&count=${top}`).then(res => res.data);
}

module.exports = {
  getUserById,
  getUser,
  getUsers,
  getUserMixNick,
  getTopBooks
}