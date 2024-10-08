import { backToClass, readData } from '../practice/utility.js';

const data = readData();
// const search = Object.entries(data).forEach(([, value]) => value.find ((name) => name === 'motiga'));
for (const item in data) {
  const f = data[item].find(({ name }) => name === 'Den');
  console.log(f);
  if (f !== undefined) {
    break;
  }
}
// console.log(search);
const keys = Object.keys(data);
const filtered = keys.map((key) => data[key].filter(({ name }) => name === 'motiga')).flat();
console.log(filtered);
