import fs from 'fs';
import path from 'path';
import TumbaUmba from './classes/tumba.js';
import SigmaBoss from './classes/sigma.js';
import Tools from './classes/tools.js';
import Weapon from './classes/weapon.js';
import BattleDogs from './classes/battle.js';

const getPath = () => path.resolve('data/people.json');

const getObj = () => JSON.parse(fs.readFileSync(getPath(), 'utf-8'));

const setTribe = (member) => {
  const data = getObj();
  data.alive.push(member);
  console.log(data);
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
};
// setTribe();

// изменение данных о состоянии объекта
const editTribe = (member) => {
  const data = getObj();
  const filtered = data.alive.filter(({ name }) => name !== member.name);
  filtered.push(member);
  data.alive = filtered;
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
};

// удаление объекта
const setDeadTribe = (member) => {
  const data = getObj();
  const filtered = data.alive.filter(({ name }) => name !== member.name);
  data.alive = filtered;
  data.dead.push(member);
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
};

// возвращаем объект json в объект класса
const backToClass = (nameToFind) => {
  const data = getObj();
  const found = data.alive.find(({ name }) => name === nameToFind);
  let classObj;
  switch (found.className) {
    case 'tumbaumba':
      classObj = new TumbaUmba(nameToFind);
      break;
    case 'sigmaboss':
      classObj = new SigmaBoss(nameToFind);
      break;
    case 'tools':
      classObj = new Tools(nameToFind);
      break;
    case 'weapon':
      classObj = new Weapon(nameToFind);
      break;
    default:
      classObj = BattleDogs(nameToFind);
      break;
  }
  const entries = Object.entries(found);
  // [[k1,v1] [k2, v2]]
  for ([key, value] of entries) {
    if (_.isObject(value)) {
      classObj[key] = value.map((item) => backToClass(item));
    } else {
      classObj[key] = value;
    }
  }
};
export {
  setTribe, editTribe, setDeadTribe, backToClass,
};
