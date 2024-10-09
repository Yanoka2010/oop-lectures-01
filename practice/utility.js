import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import readlineSync from 'readline-sync';
import TumbaUmba from './classes/tumba.js';
import SigmaBoss from './classes/sigma.js';
import Tool from './classes/tools.js';
import Weapon from './classes/weapon.js';
import BattleDog from './classes/battle.js';

const getPath = () => path.resolve('data/units.json');

const readData = () => JSON.parse(fs.readFileSync(getPath(), 'utf-8'));

const updateJSON = (data) => fs.writeFileSync(getPath(), JSON.stringify(data, null, 2), 'utf-8');

const setObject = (member) => {
  const data = readData();
  member.className === 'BattleDog'
    ? data.dog.push(member)
    : member.className === 'Tool' || member.className === 'Weapon'
      ? data.item.push(member) : data.alive.push(member);
  updateJSON(data);
};

const createObject = (key, name) => {
  const classes = ['SigmaBoss', 'TumbaUmba', 'Tool', 'Weapon', 'BatlleDog']
  const templates = {
    0: new SigmaBoss(name),
    1: new TumbaUmba(name),
    2: new Tool(name),
    3: new Weapon(name),
    4: new BattleDog(name),
  }
  return templates[classes.indexOf(key)];
}

const addItem = () => {
  const data = readData();

  const listOfNames = data.alive.map(({ name }) => name);
  const indexOfName = readlineSync.keyInSelect(listOfNames, 'Кому добавляем: ');

  let person = data.alive.at(indexOfName);
  let item;
  if (person.className === 'SigmaBoss') {
    const listOfItems = data.items.map(({ name }) => name);
    const indexOfItem = readlineSync.keyInSelect(listOfItems, 'Что добавляем: ');
    item = data.items.at(indexOfItem);
    // person.weapons.push(item);
  } else {
    const choice = readlineSync.keyInSelect(['собаки', 'инструменты'], 'Кого/что добавляем? ');
    if (choice === 0) {
      const listOfDogs = data.dog.map(({ name }) => name);
      const indexOfDog = readlineSync.keyInSelect(listOfDogs, 'Кого добавляем: ');
      item = data.dog.at(indexOfDog);
    } else {
      const listOfTools = data.items.filter(({ className }) => className === 'Tool');
      const listOfToolNames = listOfTools.map(({ name }) => name);
      const indexOfTool = readlineSync.keyInSelect(listOfToolNames, 'Что добавляем: ');
      item = listOfTools.at(indexOfTool);
    }
  }
  person = backToClass(person.name);
  item = backToClass(item.name);
  console.log(person);
  if (person.className === 'SigmaBoss') {
    person.addWeapon(item);
  } else if (item.className === 'BattleDog') {
    person.addDog(item);
  } else {
    person.addTool(item);
  }
  editObject(person);
};

// ф-ция, которая терминально создает объект класса и сохраняет его
const createData = () => {
  const classes = ['SigmaBoss', 'TumbaUmba', 'Tool', 'Weapon', 'BatlleDog'];
  const index = readlineSync.keyInSelect(classes, 'Кого создаем? ');

  if (index === -1) {
    return false;
  }

  const className = classes[index];
  const name = readlineSync.question('Имя/название: ');

  const classObj = createObject(className, name);
  // let classObj;
  // switch (className) {
  //   case 'TumbaUmba':
  //     classObj = new TumbaUmba(name);
  //     break;
  //   case 'SigmaBoss':
  //     classObj = new SigmaBoss(name);
  //     break;
  //   case 'Tool':
  //     classObj = new Tool(name);
  //     break;
  //   case 'Weapon':
  //     classObj = new Weapon(name);
  //     break;
  //   default:
  //     classObj = new BattleDog(name);
  //     break;
  // }

  console.log(classObj);
  setObject(classObj);
  return true;
};
const findByName = (data, nameToFind) => {
  const keys = Object.keys(data);
  const filtered = keys.flatMap((key) => data[key].filter(({ name }) => name === nameToFind));
  return filtered.at(0);
};

// изменение данных о состоянии объекта
const editObject = (member) => {
  const data = readData();
  // const keys = Object.keys(data);
  // const filtered = keys.map((key) => data[key].filter(({ name }) => name === member)).flat().at(0);
  const chota = findByName(data, member.name);
  const status = (chota.className === 'SigmaBoss' || chota.className === 'TumbaUmba')
    ? 'alive'
    : chota.className === 'BatlleDog'
      ? 'dog'
      : 'items';
  const filtered = data[status].filter(({ name }) => name !== member.name);
  filtered.push(member);
  data.alive = filtered;
  updateJSON(data);
  return member;
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
  const keys = Object.keys(data);
  let found = keys.flatMap((key) => data[key].filter(({ name }) => name === nameToFind));
  found = found.at(0);
  // const found = data.alive.find(({ name }) => name === nameToFind);
  // let classObj;
  // switch (found.className) {
  //   case 'TumbaUmba':
  //     classObj = new TumbaUmba(nameToFind);
  //     break;
  //   case 'Sigmaboss':
  //     classObj = new SigmaBoss(nameToFind);
  //     break;
  //   case 'Tool':
  //     classObj = new Tool(nameToFind);
  //     break;
  //   case 'Weapon':
  //     classObj = new Weapon(nameToFind);
  //     break;
  //   default:
  //     classObj = new BattleDog(nameToFind);
  //     break;
  // }
  const classObj = createObject(found.className, nameToFind);
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
  return classObj;
};

// если предмет передали какому-то аборигену, то этот предмет удаляется из item
// подумать механику перестрелки
export {
  setObject, readData, addItem, editObject, setDeadTribe, backToClass, createData,
};
