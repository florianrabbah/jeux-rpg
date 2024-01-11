class Character {
    constructor(name, hp, mana, dmg) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.mana = mana;
        this.dmg = dmg;
        this.status = "playing";
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.status = "loser";
        }
    }

    dealDamage(victim) {
        victim.takeDamage(this.dmg);
        this.mana += 20;
    }
}

class Fighter extends Character {
    constructor() {
        super("Grace", 12, 40, 4);
    }

    darkVision(victim) {
        if (this.mana >= 20) {
            victim.takeDamage(5);
            this.mana -= 20;
            this.takeDamage(2);
        }
    }
}

class Paladin extends Character {
    constructor() {
        super("Ulder", 16, 160, 3);
    }

    healingLighting(victim) {
        if (this.mana >= 40) {
            victim.takeDamage(4);
            this.hp += 5;
            this.mana -= 40;
        }
    }
}

class Monk extends Character {
    constructor() {
        super("Moana", 8, 200, 2);
    }

    heal() {
        if (this.mana >= 25) {
            this.hp += 8;
            this.mana -= 25;
        }
    }
}

class Berzerker extends Character {
    constructor() {
        super("Draven", 8, 0, 4);
    }

    rage() {
        this.dmg += 1;
        this.hp -= 1;
    }
}

class Assassin extends Character {
    constructor() {
        super("Carl", 6, 20, 6);
    }

    shadowHit(victim) {
        if (this.mana >= 20) {
            victim.takeDamage(7);
            this.mana -= 20;
            this.status = "shadowHit";
        }
    }
}
