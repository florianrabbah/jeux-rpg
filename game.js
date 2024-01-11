class Game {
  constructor() {
      this.characters = [
          new Fighter(),
          new Paladin(),
          new Monk(),
          new Berzerker(),
          new Assassin()
      ];
      this.turnLeft = 10;
  }

  skipTurn() {
      this.turnLeft--;
      if (this.turnLeft === 0) {
          this.endGame();
      }
  }

  startTurn() {
      console.log(`It's turn ${11 - this.turnLeft}`);
      this.characters = this.shuffleArray(this.characters);

      this.characters.forEach(character => {
          if (character.status === "playing") {
              console.log(`It's time for ${character.name} to play`);
              this.attackOrSpecial(character);
          }
      });

      this.logRemainingCharacters();
      this.skipTurn();
  }

  attackOrSpecial(attacker) {
      const victim = this.chooseRandomVictim(attacker);

      if (Math.random() < 0.5) {
          attacker.dealDamage(victim);
          console.log(`${attacker.name} is attacking ${victim.name}. He deals him ${attacker.dmg} damages. ${victim.name} got ${victim.hp} lifepoints left.`);
      } else {
          this.useSpecialAttack(attacker, victim);
      }
  }

  useSpecialAttack(attacker, victim) {
      switch (attacker.constructor.name) {
          case "Fighter":
              attacker.darkVision(victim);
              console.log(`${attacker.name} uses Dark Vision on ${victim.name}.`);
              break;
          case "Paladin":
              attacker.healingLighting(victim);
              console.log(`${attacker.name} uses Healing Lighting on ${victim.name}.`);
              break;
          case "Monk":
              attacker.heal();
              console.log(`${attacker.name} uses Heal.`);
              break;
          case "Berzerker":
              attacker.rage();
              console.log(`${attacker.name} goes into a Rage.`);
              break;
          case "Assassin":
              attacker.shadowHit(victim);
              console.log(`${attacker.name} uses Shadow Hit on ${victim.name}.`);
              break;
          default:
              break;
      }
  }

  chooseRandomVictim(attacker) {
      const validTargets = this.characters.filter(character => character !== attacker && character.status === "playing");
      return validTargets[Math.floor(Math.random() * validTargets.length)];
  }

  logRemainingCharacters() {
      const remainingCharacters = this.characters.filter(character => character.status === "playing");
      console.log("Remaining characters:");
      remainingCharacters.forEach(character => {
          console.log(`${character.name} (${character.hp} HP)`);
      });
  }

  endGame() {
      const winner = this.characters.find(character => character.status === "playing");
      if (winner) {
          winner.status = "winner";
          console.log(`${winner.name} wins the game!`);
      } else {
          console.log("It's a draw!");
      }
  }

  shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

  watchStats(element) {
    const statsContainer = element;
    statsContainer.innerHTML = ""; // Effacer le contenu précédent

    this.characters.forEach(character => {
      const characterInfo = document.createElement("div");
      characterInfo.classList.add("character-info");

      const statusText = character.status === "playing" ? "Playing" : "Eliminated";
      characterInfo.innerHTML = `<strong>${character.name}</strong>: ${character.hp} HP, ${character.mana} Mana - Status: ${statusText}`;

      statsContainer.appendChild(characterInfo);
    });
  }

  startGame() {
      console.log("Game starts!");
      while (this.turnLeft > 0) {
          this.startTurn();
      }
  }
}
