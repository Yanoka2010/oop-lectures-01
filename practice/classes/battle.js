class BattleDogs {
  constructor(name) {
    this.name = name;
    this.className = 'BattleDog';
    this.health = 5 + Math.round(Math.random() * 25);
    this.trainingLvl = 0;
    this.damage = 5;
  }

  tRENEROFCKA() {
    this.trainingLvl += 1;
  }

  takeDamage(damage) {
    if (this.dogs.length > 0) {
      if (this.dogs.at(0).takeDamage(damage)) {
        this.dogs.shift();
      }
    } else {
      this.health -= damage;
      if (this.health <= 0) {
        console.log(`${this.name} умер сорре`);
      } else {
        console.log(`${this.name} получил ${damage}, осталось ${this.health}`);
      }
    }
  }

  attack(target) {
    console.log(`${this.name} атакует ${target.name}`);
    if (this.trainingLvl > 0) {
      target.takeDamage(Math.floor(this.damage * (1 + (this.trainingLvl / 10))));
    } else {
      target.takeDamage(this.damage);
    }
  }
}

export default BattleDogs;
