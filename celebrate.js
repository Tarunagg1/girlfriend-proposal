const sweetMessages = [
  "Tap me and I will send more love.",
  "Your smile is my favorite sunrise.",
  "With you, every second feels magical.",
  "Your laugh heals my whole day.",
  "I choose you, in every life.",
  "One more tap and feel the warmness.",
  "Thank you for being mine forever."
];

let messageIndex = 0;
const momentLines = [
  "Time for more love",
  "Your laugh is my lucky charm",
  "You + me = forever",
  "Every day, I choose you again"
];
let momentIndex = 0;
let warmTapCount = 0;
const requiredWarmTaps = 7;

function createFlowerRain() {
  const rain = document.querySelector(".flower-rain");
  if (!rain) return;

  const flowers = ["*", "o", "+", "*"];
  for (let i = 0; i < 42; i += 1) {
    const flower = document.createElement("span");
    flower.className = "flower";
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.animationDelay = `${Math.random() * 10}s`;
    flower.style.animationDuration = `${7 + Math.random() * 8}s`;
    flower.style.fontSize = `${12 + Math.random() * 12}px`;
    rain.appendChild(flower);
  }
}

function spawnFloatingHearts() {
  const card = document.querySelector(".celebration-card");
  if (!card) return;

  for (let i = 0; i < 9; i += 1) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = "love";
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.animationDelay = `${Math.random() * 0.7}s`;
    card.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2500);
  }
}

function showNextMessage() {
  const messageNode = document.querySelector("#loveMessage");
  if (!messageNode) return;

  messageNode.textContent = sweetMessages[messageIndex];
  messageIndex = (messageIndex + 1) % sweetMessages.length;
}

function bindBlessButton() {
  const button = document.querySelector("#blessButton");
  if (!button) return;

  button.addEventListener("click", () => {
    const tapCounterNode = document.querySelector("#tapCounter");
    const foreverNote = document.querySelector("#foreverNote");

    if (warmTapCount >= requiredWarmTaps) {
      return;
    }

    warmTapCount += 1;
    showNextMessage();
    spawnFloatingHearts();

    button.classList.remove("heart-jump");
    void button.offsetWidth;
    button.classList.add("heart-jump");

    if (tapCounterNode) {
      tapCounterNode.textContent = `Warm taps: ${warmTapCount} / ${requiredWarmTaps}`;
    }

    if (warmTapCount >= requiredWarmTaps) {
      document.body.classList.add("warm-mode");
      if (foreverNote) {
        foreverNote.classList.add("show");
      }
      button.textContent = "Forever Yours";
      button.disabled = true;
      button.style.opacity = "0.9";
    }
  });
}

function rotateMomentLine() {
  const momentNode = document.querySelector("#momentLine");
  if (!momentNode) return;

  momentNode.textContent = momentLines[momentIndex];
  momentIndex = (momentIndex + 1) % momentLines.length;
}

window.addEventListener("DOMContentLoaded", () => {
  createFlowerRain();
  bindBlessButton();
  const messageNode = document.querySelector("#loveMessage");
  if (messageNode) {
    messageNode.textContent = sweetMessages[0];
  }
  rotateMomentLine();
  setInterval(rotateMomentLine, 2800);
});
