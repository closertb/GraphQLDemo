/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-06-19
 */

import { getUserMixNick } from './connector';

const resolver = {

	User: {
		userMixNick({ id }) {
			return getUserMixNick(id);
		}
	}

};

export default resolver;
