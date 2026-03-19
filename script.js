const strategyChat = document.getElementById("strategyChat");
const strategySteps = [
  { title: "CREARE CONȚINUT AI", icon: "fa-robot", body: "Generăm vizualuri și texte care păstrează vocea brandului tău." },
  { title: "PROGRAMARE AUTOMATĂ", icon: "fa-calendar-check", body: "Sincronizăm calendarul pentru ca postările să apară la orele ideale." },
  { title: "RĂSPUNSURI INSTANT", icon: "fa-comments", body: "AI-ul preia DM-urile și comentariile 24/7." },
  { title: "RE-ENGAGEMENT", icon: "fa-bell", body: "Sistemul trimite memento-uri clienților vechi automat." }
];

let sIndex = 0;
let strategyStarted = false;

function spawnStrategy() {
  if (sIndex >= strategySteps.length) return;
  const step = strategySteps[sIndex];
  const msg = document.createElement("div");
  msg.className = "strategy-message";
  msg.innerHTML = `<i class="fa-solid ${step.icon}"></i><div><strong style="display:block; font-size:12px; margin-bottom:2px;">${step.title}</strong><span style="font-size:12px; color:#A7B0BA;">${step.body}</span></div>`;
  strategyChat.appendChild(msg);
  setTimeout(() => msg.classList.add("animate"), 20);
  sIndex++;
  setTimeout(spawnStrategy, 750);
}

// TYPING EFFECT
const captionText = "🚀 AI-ul se ocupă de tot. Automatizarea este noul standard. ✨";
let typingStarted = false;

function typeCaption() {
  const span = document.getElementById("typeCaption");
  if(!span) return;
  let i = 0;
  const interval = setInterval(() => {
    span.textContent += captionText.charAt(i);
    i++;
    if (i >= captionText.length) clearInterval(interval);
  }, 45);
}

// CALENDAR
function initCalendar() {
  const grid = document.getElementById("calGrid");
  if(!grid) return;
  for (let i = 1; i <= 28; i++) {
    const day = document.createElement("div");
    day.className = "cal-day";
    if (i % 4 === 0 || i % 7 === 0) {
      const p = document.createElement("div");
      p.className = "cal-post";
      day.appendChild(p);
    }
    grid.appendChild(day);
  }
}

let calendarAnimated = false;

function handleScroll() {
  const trigger = window.innerHeight - 80;

  // Strategie
  const strat = document.getElementById("strategyStage");
  if (!strategyStarted && strat?.getBoundingClientRect().top < trigger) {
    strategyStarted = true; spawnStrategy();
  }

  // Insta Typing
  if (!typingStarted && document.getElementById("igMockup")?.getBoundingClientRect().top < trigger) {
    typingStarted = true; setTimeout(typeCaption, 400);
  }

  // Calendar
  if (!calendarAnimated && document.getElementById("calendarSection")?.getBoundingClientRect().top < trigger) {
    calendarAnimated = true;
    document.querySelectorAll(".cal-post").forEach((p, idx) => setTimeout(() => p.classList.add("active"), idx * 150));
  }

  // Notificare
  const rem = document.getElementById("reminderSection");
  if (rem?.getBoundingClientRect().top < trigger) rem.classList.add("active");

  // Impact
  const growth = document.getElementById("growthSection");
  if (growth && growth.getBoundingClientRect().top < trigger && !growth.dataset.done) {
    growth.dataset.done = "true";
    document.querySelectorAll(".metric-number").forEach(num => {
      const target = +num.dataset.target;
      let c = 0;
      const int = setInterval(() => {
        c += Math.ceil(target/35);
        if (c >= target) { num.innerText = target; clearInterval(int); }
        else num.innerText = c;
      }, 40);
    });
    document.querySelectorAll(".progress-fill").forEach(b => b.style.width = b.dataset.width);
    document.querySelector(".graph-container").classList.add("visible");
  }

  // Reveal
  document.querySelectorAll(".scroll-appear").forEach(el => {
    if (el.getBoundingClientRect().top < trigger) el.classList.add("visible");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCalendar();
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});