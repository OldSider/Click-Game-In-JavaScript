class Character {
  _life = 1;
  maxlife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }

  get life() {
    return this._life;
  }
  set life(NewLife) {
    this._life = NewLife < 0 ? 0 : NewLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxlife = this.life;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 15;
    this.defense = 4;
    this.maxlife = this.life;
  }
}

class LittleMonster extends Character {
  constructor() {
    super("Slime");
    this.life = 80;
    this.attack = 5;
    this.defense = 5;
    this.maxlife = this.life;
  }
}

class BigMonster extends Character {
  constructor() {
    super("Giant");
    this.life = 200;
    this.attack = 20;
    this.defense = 45;
    this.maxlife = this.life;
  }
}

class Stage {
  constructor(fighter1, fighter2, fighter1EL, fighter2EL, logObject) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1EL = fighter1EL;
    this.fighter2EL = fighter2EL;
    this.log = logObject;
  }

  start() {
    this.update();

    this.fighter1EL
      .querySelector(".attackButton")
      .addEventListener("click", () =>
        this.doAttack(this.fighter1, this.fighter2)
      );

    this.fighter2EL
      .querySelector(".attackButton")
      .addEventListener("click", () =>
        this.doAttack(this.fighter2, this.fighter1)
      );
  }

  update() {
    //fighter 1
    this.fighter1EL.querySelector(".name").innerHTML = `${
      this.fighter1.name
    } - ${this.fighter1.life.toFixed(0)} HP`;
    let f1Pct = (this.fighter1.life / this.fighter1.maxlife) * 100;
    this.fighter1EL.querySelector(".bar").style.width = `${f1Pct}%`;
    //fighter 2
    let f2Pct = (this.fighter2.life / this.fighter2.maxlife) * 100;
    this.fighter2EL.querySelector(".bar").style.width = `${f2Pct}%`;
    this.fighter2EL.querySelector(".name").innerHTML = `${
      this.fighter2.name
    } - ${this.fighter2.life.toFixed(0)} HP`;
  }

  doAttack(attacking, attacked) {
    if (attacking.life <= 0) {
      this.log.addMessage("you died");
      return;
    }

    if (attacked.life <= 0) {
      this.log.addMessage("your opponent is dead");
      return;
    }

    let attackFactor = (Math.random() * 2).toFixed(2);
    let actualAttack = attacking.attack * attackFactor;

    let defenseFactor = (Math.random() * 2).toFixed(2);
    let actualDefense = attacking.defense * defenseFactor;

    if (actualAttack > actualDefense) {
      attacked.life -= actualAttack;
      this.log.addMessage(
        `${attacking.name} caused ${actualAttack.toFixed(2)} damage in ${
          attacked.name
        }`
      );
    } else {
      this.log.addMessage(`${attacked.name} defense hit`);
    }
    this.update();
  }
}

class Log {
  list = [];

  constructor(listEL) {
    this.listEL = listEL;
  }

  addMessage(msg) {
    this.list.push(msg);
    this.render();
  }

  render() {
    this.listEL.innerHTML = "";

    for (let i in this.list) {
      this.listEL.innerHTML += `<li>${this.list[i]}</li>`;
    }
  }
}
