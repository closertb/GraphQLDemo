import { util } from './util';

console.log('hello util:', util);

const hello = 'Hello';

export default function sayHello() {
  console.log('the output is:');
  return hello;
};

export function cube(a, b) {
  console.log('the res is:');
  return a + b;
}