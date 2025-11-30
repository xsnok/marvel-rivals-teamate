const questions = [
  "I ping enemy positions instead of expecting teammates to read my mind.",
  "I don't instantly blame matchmaking or teammates when I lose.",
  "I switch heroes when my pick isn't working.",
  "I know when to stay on point and when to run away.",
  "I don't dive 1v6 just because my ultimate is ready.",
  "I help teammates even if they're toxic.",
  "I call out when I'm going to ult",
  "I don't insta-lock my main and I play around the team comp.",
  "I don't chase kills so hard that I forget the objective.",
  "I adapt my to my team comp instead of doing the same thing every match.",
  "I stay until the end even if the match is going badly.",
  "I say 'gg' even when my team gets destroyed.",
];

const answers = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const points = [0, 1, 2, 3, 4];

const quizContainer = document.getElementById("quiz");
const progressFill = document.getElementById("progressFill");

questions.forEach((q, qi) => {
  const div = document.createElement("div");
  div.className = "question";

  let html = `<p><strong>${qi + 1}. ${q}</strong></p><div class="options">`;
  answers.forEach((ans, ai) => {
    html += `<button data-q="${qi}" data-a="${ai}">${ans}</button>`;
  });
  html += `</div>`;
  div.innerHTML = html;

  quizContainer.appendChild(div);
});

document.querySelectorAll(".options button").forEach((btn) => {
  btn.addEventListener("click", function () {
    const qid = this.getAttribute("data-q");
    document
      .querySelectorAll(`button[data-q="${qid}"]`)
      .forEach((b) => b.classList.remove("selected"));
    this.classList.add("selected");

    const answered = document.querySelectorAll(
      ".options button.selected"
    ).length;
    progressFill.style.width = `${(answered / questions.length) * 100}%`;
  });
});

const submit = document.createElement("button");
submit.id = "submitBtn";
submit.textContent = "Submit";
quizContainer.appendChild(submit);

submit.addEventListener("click", function () {
  let total = 0;
  let completed = true;

  questions.forEach((q, i) => {
    const selected = document.querySelector(`button[data-q="${i}"].selected`);
    if (!selected) completed = false;
    else total += points[selected.getAttribute("data-a")];
  });

  if (!completed) {
    alert("Answer all questions first!");
    return;
  }

  let tier = "";
  if (total >= 41)
    tier = "🟩 S-Tier Teammate — Your team thanks you. Even the randoms.";
  else if (total >= 33) tier = "🟦 A-Tier Reliable — You carry your weight.";
  else if (total >= 25) tier = "🟨 B-Tier Decent — You’re fine… unless tilted.";
  else if (total >= 17) tier = "🟧 C-Tier Teammate — You help… by accident.";
  else if (total >= 9)
    tier = "🟥 D-Tier Liability — You might be the reason your team is losing.";
  else tier = "⬛ F-Tier Menace — Matchmaker cries when you queue.";

  document.getElementById("quiz").style.display = "none";
  document.getElementById("progress").style.display = "none";
  const resultScreen = document.getElementById("resultScreen");
  resultScreen.style.display = "block";
  document.getElementById("result").textContent = tier;
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    color: ["#ff4655", "#4aa1ff", "#ffd700"][Math.floor(Math.random() * 3)],
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x > w || p.x < 0) p.dx *= -1;
    if (p.y > h || p.y < 0) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();
