import moment from 'moment';

export const util = 'hello utils';
export function format() {
  return moment().format('YYYY-MM-DD');
}