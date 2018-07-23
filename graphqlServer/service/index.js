import qs from 'querystring';
import http from '../utils/http';

export function getUserById(id) {
  return http.get(`http://127.0.0.1:4001/users/${id}`);
}

export async function getUser(userId) {
  return await http.get(`http://127.0.0.1:4001/users/${userId}`).then(res => res.data);
}

export async function getUsers(queryParams, pageNum, pageSize) {

  const params = qs.stringify({ ...queryParams, pageNum, pageSize });
  return await http.get(`http://127.0.0.1:4001/users?${params}`).then(res => res.data);
}

export async function getUserMixNick(userId) {
  return await http.get(`http://127.0.0.1:4001/api/${userId}/nickName/`).then(res => res.data);
}

// 获取我曾度过的书籍
export async function getUserBooks(userId) {
  return await http.get(`https://api.douban.com/v2/book/user/58898719/collections?count=60`).then(res => res.data);
}