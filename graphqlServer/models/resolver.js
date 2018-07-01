/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-06-12
 */

import { getUser, getUsers } from './User/connector';

const resolver = {

	Query: {
		user(root, { id }) {
			return getUser(id);
		},

		users(root, { filters, pageNum, pageSize }) {
			return getUsers(filters, pageNum, pageSize);
		}
	}

};

export default resolver;
