import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import TumbaUmba from './classes/tumba.js';
import SigmaBoss from './classes/sigma.js';
import Tools from './classes/tools.js';
import Weapon from './classes/weapon.js';
import BattleDogs from './classes/battle.js';

const getPath = () => path.resolve('data/units.json');

const readData = () => JSON.parse(fs.readFileSync(getPath(), 'utf-8'));

const updateJSON = (data) => fs.writeFileSync(getPath(), JSON.stringify(data, null, 2), 'utf-8');

const setObject = (member) => {
  const data = readData();
  member.className === 'BattleDog'
    ? data.dog.push(member)
    : member.className === 'Tools' || member.className === 'Weapon'
      ? data.item.push(member) : data.alive.push(member);
  updateJSON(data);
};
// setTribe();

const addItem = () => {
  const data = readData();

  const listOfNames = data.alive.map(({ name }) => name);
  const indexOfName = readlineSync.keyInSelect(listOfNames, 'Кому добавляем: ');

  let person = data.alive.at(indexOfName);
  let item;
  if (person.className === 'SigmaBoss') {
    const listOfItems = data.item.map(({ name }) => name);
    const indexOfItem = readlineSync.keyInSelect(listOfItems, 'Что добавляем: ');
    item = data.item.at(indexOfItem);
  } else {
    const choice = readlineSync.keyInSelect(['собаки', 'инструменты'], 'Кого/что добавляем? ');
    if (choice === 0) {
      const listOfDog = data.dog.map(({ name }) => name);
      const indexOfDog = readlineSync.keyInSelect(listOfDog, 'Кто добавляем: ');
      item = data.dog.at(indexOfDog);
    } else {
      const listOfTolls = data.item.filter(({ className }) => className === 'Tolls');
      const listOfTollNames = listOfTolls.map(({ name }) => name);
      const indexOfTolls = readlineSync.keyInSelect(listOfTollNames, 'Что добавляем: ');
      item = listOfTolls.at(indexOfTolls);
    }
  }
  person = backToClass(person);
  item = backToClass(item);
  if (person.className === 'SigmaBoss') {
    person.addWeapon(item);
  } else if (item.className === 'BattleDog') {
    person.addDpg(item);
  } else {
    person.addTools(item);
  }
  updateJSON();
};
// ф-ция, которая терминально создает объект класса и сохраняет его
const createData = () => {
  const classes = ['SigmaBoss', 'TumbaUmba', 'Tools', 'Weapon', 'BatlleDogs'];
  const index = readlineSync.keyInSelect(classes, 'Кого создаем? ');

  if (index === -1) {
    return false;
  }

  const className = classes[index];
  const name = readlineSync.question('Имя/название: ');

  let classObj;
  switch (className) {
    case 'TumbaUmba':
      classObj = new TumbaUmba(name);
      break;
    case 'SigmaBoss':
      classObj = new SigmaBoss(name);
      break;
    case 'Tools':
      classObj = new Tools(name);
      break;
    case 'Weapon':
      classObj = new Weapon(name);
      break;
    default:
      classObj = new BattleDogs(name);
      break;
  }

  console.log(classObj);
  setObject(classObj);
};
// изменение данных о состоянии объекта
const editObject = (member) => {
  const data = readData();
  const keys = Object.keys(data);
  const filtered = keys.map((key) => data[key].filter(({ name }) => name === member)).flat().at(0);
  // const filtered = data.alive.filter(({ name }) => name !== member.name);
  filtered.push(member);
  data.alive = filtered;
  updateJSON(data);
};

// удаление объекта
const setDeadTribe = (member) => {
  const data = readData();
  const filtered = data.alive.filter(({ name }) => name !== member.name);
  data.alive = filtered;
  data.dead.push(member);
  updateJSON(data);
};

// возвращаем объект json в объект класса
const backToClass = (nameToFind) => {
  const data = readData();
  const objEntries = Object.entries(data);
  const found = objEntries.forEach(([, value]) => value.find((name) => name === nameToFind));
  // const found = data.alive.find(({ name }) => name === nameToFind);
  let classObj;
  switch (found.className) {
    case 'TumbaUmba':
      classObj = new TumbaUmba(nameToFind);
      break;
    case 'Sigmaboss':
      classObj = new SigmaBoss(nameToFind);
      break;
    case 'Tools':
      classObj = new Tools(nameToFind);
      break;
    case 'Weapon':
      classObj = new Weapon(nameToFind);
      break;
    default:
      classObj = new BattleDogs(nameToFind);
      break;
  }
  const entries = Object.entries(found);
  // [[k1,v1] [k2, v2]]
  // for ([key, value] of entries) {
  // if (_.isObject(value)) {
  // classObj[key] = value.map((item) => backToClass(item));
  // } else {
  // classObj[key] = value;
  // }
  // }
  entries.forEach(([key, value]) => classObj[key] = _.isObject(value)
    ? value.map((item) => backToClass(item))
    : value);
};
export {
  setObject, readData, editObject, setDeadTribe, backToClass, createData,
};
