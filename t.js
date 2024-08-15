const readline = require('readline');

class Character {
    constructor(name, damage, hp) {
        this.name = name;
        this.damage = damage;
        this.hp = hp;
    }

    attack(target) {
        target.hp -= this.damage;

        if (target.hp < 0) {
            target.hp = 0;
        }
    }

    attack(target, critDmg) {
        target.hp -= critDmg;

        if (target.hp < 0) {
            console.log("Wow! You killed the enemy and deal a damage for " + critDmg);
            target.hp = 0;
        }
    }

    isAlive() {
        return this.hp > 0;
    }
}

function Game() {
    const player = new Character("James", 15, 100);
    const monster = new Character("Goblin", 15, 50);

    console.log("A monster appears before you: " + monster.name);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function nextTurn() {
        if (player.isAlive() && monster.isAlive()) {
            console.log(`${monster.name}: ${monster.hp}`);
            console.log(`${player.name}: ${player.hp}`);
            
            rl.question("Do you want to attack or not? (1/2) ", (choose) => {
                if (choose == '1') {
                    player.attack(monster);
                    console.log("You chose to attack!");

                    if (monster.isAlive()) {
                        monster.attack(player);
                    }
                } else if (choose == '2') {
                    console.log("You chose not to attack.");
                } else if (choose == '3'){
                    player.attack(monster, 10000000);
                }else {
                    console.log("Invalid choice.");
                }

                nextTurn(); // Loop the game until someone dies
            });
        } else {
            if (!player.isAlive()) {
                console.log("You have been defeated!");
            } else {
                console.log("You defeated the monster!");
            }
            rl.close(); // End the game and close the input
            console.log(`The match ended with ${monster.name} having ${monster.hp} HP and ${player.name} having ${player.hp} HP!`)
        }
    }

    nextTurn(); // Start the game
}

Game();
