// паттерны

// не лучший вариант
// class Registration {
//     constructor(props) {
//         this.options = {...props};
//     }

//     // email, pass, username
//     validateEmail() {
//         const check = {};
//         if (!this.options.email.includes('@')) {
//             check.sobaka = 'net sobaki';
//         }

//         if (!this.options.email.includes('.')) {
//             check.domain = 'net domena';
//         }

//         return check;
//     }
// }

// const vanechka = new Registration({email: 'vanya@2005.ru'})
// console.log(vanechka.validateEmail())

// вариант получше
class Registration {
  static default = {
    hasAt: true,
    hasDot: true,
  };

  constructor(props = {}) {
    this.props = { ...this.constructor.default, ...props };
  }

  validateEmail(email = '', props = {}) {
    const { hasAt, hasDot } = { ...this.props, ...props };
    const check = {};
    // console.log(hasDot)
    if (email.includes('@') !== hasAt) {
      check.hasAt = `should be ${hasAt}`;
    }

    if (email.includes('.') !== hasDot) {
      check.hasDot = `should be ${hasDot}`;
    }

    return check;
  }
}

const validator1 = new Registration();
console.log(validator1.validateEmail('vanya@2005.ru'));

const validator2 = new Registration({ hasAt: false });
console.log(validator2.validateEmail('vanya@2005.ru', { hasDot: false }));
// validator2.validateEmail('', {hasDot: null});

// object - конкретная регистрация + методы валтдации
// объект - набоор св-в валидации + методы валид по св-в люб реги

// console.log(Math.random() * 8)

// плавающий интерфейс и сборщики
class Gnomik {
  constructor() {
    this.height = 50 + Math.round(Math.random() * 100);
    this.entity = true;
    this.age = 100 + Math.round(Math.random() * 100);
  }

  changeEntity() {
    this.entity = !this.entity;
    // this.name = 'Oleg';
    return this;
  }

  changeHeight() {
    this.height = 50 + Math.round(Math.random() * 100);
    return this;
  }
}

const almazIndigo = new Gnomik();
console.log(almazIndigo);
console.log(almazIndigo.changeEntity().changeEntity().changeHeight());
// almazIndigo.changeHeight();
console.log(almazIndigo);

class Kolduni {
  constructor(list) {
    this.list = list;
  }

  filterByZdorovie() {
    const ans = this.list.filter(({ zdorovie }) => zdorovie > 7);
    return new Kolduni(ans);
  }

  filterByAge() {
    const ans = this.list.filter(({ age }) => age > 55);
    return new Kolduni(ans);
  }

  addPandus() {
    this.list.forEach((koldun) => koldun.pandus = koldun.iq < 10);
  }
}

const getRandom = (mn, delta) => mn + Math.round(Math.random() * delta);
const listOfKolduni = [
  {
    name: 'Denis', age: getRandom(12, 1000), zdorovie: getRandom(1, 25), mana: getRandom(100, 1000), iq: 10,
  },
  {
    name: 'Ivan', age: getRandom(50, 1000), zdorovie: getRandom(1, 3), mana: getRandom(0, 10), iq: 9,
  },
  {
    name: 'Anna', age: getRandom(70, 25), zdorovie: getRandom(2, 10), mana: getRandom(1000, 2), iq: 116,
  },
  {
    name: 'Timofey', age: getRandom(21, 10), zdorovie: getRandom(1, 22), mana: getRandom(1001, 2), iq: getRandom(1, 15),
  },
  {
    name: 'Yana', age: getRandom(2, 3), zdorovie: getRandom(2, 3), mana: getRandom(1002, 2), iq: getRandom(100, 50),
  },
];

const kolduns = new Kolduni(listOfKolduni);
kolduns.addPandus();
console.log(kolduns);
const filteredKolduns = kolduns.filterByZdorovie().filterByAge();
console.log(kolduns);
console.log(filteredKolduns);

class ValidateForDiddy {
  constructor() {
    this.options = {};
  }

  age(minAge) {
    this.options.age = minAge;
    return this;
  }

  pandus() {
    this.options.pandus = false;
    return this;
  }

  mana(minMana) {
    this.options.mana = minMana;
    return this;
  }

  zdorovie(minZdorovie) {
    this.options.zdorovie = minZdorovie;
    return this;
  }

  valdate(obj) {
    const entries = Object.entries(this.options);
    // console.log(entries);
    const check = entries.filter((item) => (item.at(1) === false
      ? item.at(1) === obj[item.at(0)]
      : item.at(1) <= obj[item.at(0)]));
    return !(entries.length > check.length);
  }
}

const test = new ValidateForDiddy();
test.age(20).zdorovie(7).pandus();
console.log(test);
// console.log(test.valdate(listOfKolduni[1]));
listOfKolduni.forEach((koldun) => console.log(`${koldun.name} - ${test.valdate(koldun)}`));
// console.log(false < true)
// console.log(test.age(listOfKolduni.at(0)).zdorovie());
