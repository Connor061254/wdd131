const character = {
    name: "Snortleblat",
    charClass: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: "images/snortleblat.webp",
    
    attacked() {
        if (this.health > 0) {
            this.health -= 20;
            
            if (this.health <= 0) {
                this.health = 0;
                alert(`Oh no! ${this.name} has died.`);
            }
            updateDisplay();
        }
    },
    
    levelUp() {
        if (this.health > 0) {
            this.level += 1;
            updateDisplay();
        }
    }
};

const nameEl = document.getElementById("char-name");
const classEl = document.getElementById("char-class");
const levelEl = document.getElementById("char-level");
const healthEl = document.getElementById("char-health");
const imgEl = document.getElementById("char-image");
const attackBtn = document.getElementById("btn-attack");
const levelBtn = document.getElementById("btn-level");

function updateDisplay() {
    nameEl.textContent = character.name;
    classEl.textContent = character.charClass;
    levelEl.textContent = character.level;
    healthEl.textContent = character.health;
    imgEl.src = character.image;

    if (character.health === 0) {
        attackBtn.disabled = true;
        levelBtn.disabled = true;
    }
}

attackBtn.addEventListener("click", () => {
    character.attacked();
});

levelBtn.addEventListener("click", () => {
    character.levelUp();
});

updateDisplay();