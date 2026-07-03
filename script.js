const tapPrompts = [
  "Tap once for my smile",
  "Tap again for your beautiful eyes",
  "One more for your kindness",
  "Again for our sweet memories",
  "For the warmth in your voice",
  "For the peace in your hug",
  "Last tap to open my heart"
];

let tapCount = 0;
const requiredTaps = tapPrompts.length;
const sweetStatus = [
  "Time for more love",
  "Your smile is my favorite place",
  "One heartbeat, two souls",
  "Forever starts with you"
];
let statusIndex = 0;

function addSparkles() {
  const field = document.querySelector(".sparkle-field");
  if (!field) return;

  for (let i = 0; i < 24; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.animationDelay = `${Math.random() * 3}s`;
    spark.style.animationDuration = `${3 + Math.random() * 3}s`;
    field.appendChild(spark);
  }
}

function addPetals() {
  const field = document.querySelector(".petal-field");
  if (!field) return;

  const petals = ["*", "o", "+", "*"];

  for (let i = 0; i < 34; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 8}s`;
    petal.style.animationDuration = `${7 + Math.random() * 9}s`;
    field.appendChild(petal);
  }
}

function updateMeter() {
  const tapMeter = document.querySelector("#tapMeter");
  const tapLabel = document.querySelector("#tapLabel");
  const tapButton = document.querySelector("#tapButton");

  if (!tapMeter || !tapLabel || !tapButton) return;

  tapLabel.textContent = `Love taps: ${tapCount} / ${requiredTaps}`;
  tapMeter.style.width = `${(tapCount / requiredTaps) * 100}%`;

  if (tapCount < requiredTaps) {
    tapButton.textContent = tapPrompts[tapCount];
  }
}

function animateBurst() {
  const burst = document.querySelector("#heartBurst");
  if (!burst) return;

  burst.classList.remove("pop");
  void burst.offsetWidth;
  burst.classList.add("pop");
}

function openUp() {
  const topOpenAnimation = document.querySelector("#opentop");
  const topPart = document.querySelector("#top");
  const frontPart = document.querySelector("#front");
  const backPart = document.querySelector("#back");
  const letter = document.querySelector("#letter");
  const button = document.querySelector("#tapButton");
  const panel = document.querySelector(".tap-panel");

  if (
    !topOpenAnimation ||
    !topPart ||
    !frontPart ||
    !backPart ||
    !letter ||
    !button ||
    !panel
  ) {
    return;
  }

  topOpenAnimation.beginElement();
  topPart.style.zIndex = "2";

  topPart.classList.add("animate");
  frontPart.classList.add("animate");
  backPart.classList.add("animate");
  button.classList.add("animate");
  panel.classList.add("animate");
  letter.classList.add("animate");

  // Force-hide button in case browser style precedence keeps it visible.
  setTimeout(() => {
    button.style.display = "none";
  }, 300);
}

function cycleStatusLine() {
  const tapLabel = document.querySelector("#tapLabel");
  if (!tapLabel || tapCount >= requiredTaps) return;

  tapLabel.textContent = sweetStatus[statusIndex];
  statusIndex = (statusIndex + 1) % sweetStatus.length;
}

function onLoveTap() {
  const tapButton = document.querySelector("#tapButton");
  if (!tapButton) return;

  if (tapCount >= requiredTaps) return;

  tapCount += 1;
  animateBurst();
  updateMeter();

  if (tapCount >= requiredTaps) {
    tapButton.textContent = "Opening my heart...";
    tapButton.disabled = true;
    setTimeout(openUp, 550);
  }
}

function bindEvents() {
  const tapButton = document.querySelector("#tapButton");
  if (!tapButton) return;

  tapButton.addEventListener("click", onLoveTap);
}

window.addEventListener("DOMContentLoaded", () => {
  addSparkles();
  addPetals();
  updateMeter();
  bindEvents();
  setInterval(cycleStatusLine, 3200);
});
