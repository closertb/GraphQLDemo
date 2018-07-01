/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-06-12
 */

import qs from 'querystring';
import http from '../../utils/http';

export async function getUser(userId) {

	return await http.get(`http://127.0.0.1:8080/users/${userId}`).then(res => res.data);
}

export async function getUsers(queryParams, pageNum, pageSize) {

	const params = qs.stringify({ ...queryParams, pageNum, pageSize });
	return await http.get(`http://127.0.0.1:8080/users?${params}`).then(res => res.data);
}

export async function getUserMixNick(userId) {
	return await http.get(`http://127.0.0.1:8080/taobao/${userId}/nick/`).then(res => res.data);
}
