const STORAGE_KEY = "measurefit_v1";

const measurementLabels = {
  waist: "Taille", belly: "Bauch", hips: "Hüfte", chest: "Brust", neck: "Hals",
  armLeft: "Oberarm L", armRight: "Oberarm R", thighLeft: "Oberschenkel L",
  thighRight: "Oberschenkel R", calfLeft: "Wade L", calfRight: "Wade R",
  weight: "Gewicht", bodyFat: "Körperfett", water: "Wasser", muscle: "Muskelmasse"
};

const cmFields = ["waist","belly","hips","chest","neck","armLeft","armRight","thighLeft","thighRight","calfLeft","calfRight"];
const secondaryFields = ["weight","bodyFat","water","muscle"];

const exerciseBank = {
  beginner: [
    ["Box Squat", "Glute Bridge", "Wall Push-up", "Dead Bug", "Standing March"],
    ["Step Back Lunges leicht", "Bird Dog", "Incline Push-up", "Side Steps", "Plank auf Knien"],
    ["Squat mit Pause", "Hip Hinge", "Shoulder Taps erhöht", "Heel Taps", "Calf Raises"]
  ],
  returning: [
    ["Bodyweight Squat", "Reverse Lunge", "Incline Push-up", "Dead Bug", "Low Impact Mountain Climber"],
    ["Split Squat", "Glute Bridge einbeinig leicht", "Push-up erhöht", "Side Plank", "Good Morning"],
    ["Tempo Squat", "Lateral Lunge", "Plank", "Superman Pull", "Skater Step"]
  ],
  intermediate: [
    ["Tempo Squat", "Walking Lunges", "Push-up", "Plank Shoulder Taps", "Mountain Climbers"],
    ["Bulgarian Split Squat", "Single Leg Glute Bridge", "Pike Push-up", "Side Plank Dips", "Squat Pulses"],
    ["Jump-free Burpee", "Cossack Squat leicht", "Push-up negativ", "Hollow Hold", "Fast Feet"]
  ]
};

const limitationSwap = {
  knees: {
    "Reverse Lunge": "Glute Bridge",
    "Walking Lunges": "Hip Hinge",
    "Bulgarian Split Squat": "Wall Sit kurz",
    "Lateral Lunge": "Side Steps"
  },
  back: {
    "Superman Pull": "Bird Dog",
    "Good Morning": "Glute Bridge",
    "Hollow Hold": "Dead Bug",
    "Jump-free Burpee": "Step-out Plank"
  },
  lowimpact: {
    "Mountain Climbers": "Slow Mountain Climbers",
    "Fast Feet": "Standing March",
    "Jump-free Burpee": "Walkout ohne Sprung"
  }
};

const state = loadState();

function loadState() {
  const fallback = { measurements: [], goals: null, plans: {} };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || fallback;
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

function bmi(weight, height) {
  if (!weight || !height) return null;
  const m = Number(height) / 100;
  return (Number(weight) / (m * m)).toFixed(1);
}

function generatePlan() {
  const goals = state.goals || {
    goal: "fatloss", level: "beginner", daysPerWeek: 3, minutes: 30,
    equipment: "none", limitations: "none", monthlyGoal: ""
  };

  const key = monthKey();
  const monthNumber = new Date().getMonth() + 1;
  const progression = Math.max(0, Object.keys(state.plans).length);
  const days = Math.min(Math.max(Number(goals.daysPerWeek) || 3, 1), 6);
  const minutes = Math.min(Math.max(Number(goals.minutes) || 30, 10), 90);
  const sets = goals.level === "beginner" ? 2 + Math.floor(progression / 2) : 3 + Math.floor(progression / 2);
  const reps = goals.goal === "muscle" ? "8–12 langsam" : "10–15 kontrolliert";
  const rest = progression < 2 ? "60–75 Sek." : "40–60 Sek.";

  const bank = exerciseBank[goals.level] || exerciseBank.beginner;
  const plan = [];

  for (let day = 1; day <= days; day++) {
    const source = bank[(day + monthNumber + progression) % bank.length];
    const exercises = source.map(ex => {
      let name = ex;
      const swaps = limitationSwap[goals.limitations] || {};
      if (swaps[name]) name = swaps[name];
      return `${name}: ${sets} Sätze x ${reps}`;
    });

    if (goals.equipment === "bands") exercises.push(`Band Pull Apart oder Band Row: ${sets} Sätze x 12–15`);
    if (goals.equipment === "dumbbells") exercises.push(`Kurzhantel Row oder Goblet Squat: ${sets} Sätze x 8–12`);
    if (goals.equipment === "mixed") exercises.push(`Optionales Zusatzgewicht oder Band: ${sets} Sätze x 10–12`);

    plan.push({
      title: `Trainingstag ${day}`,
      duration: `${minutes} Minuten`,
      focus: day % 2 === 0 ? "Core & Oberkörper" : "Beine, Po & Ganzkörper",
      warmup: "5 Minuten Mobilität: Kreisen, lockeres Marschieren, Hüftöffner",
      exercises,
      finisher: goals.goal === "fatloss" ? "3 Minuten Low-Impact-Finisher" : "2 Minuten ruhiges Core-Halten",
      progression: "Nächsten Monat: +1 Satz, schwerere Variante oder 5 Sekunden längere Haltezeiten.",
      rest
    });
  }

  state.plans[key] = { createdAt: todayISO(), goals, plan };
  saveState();
}

function switchTab(tabName) {
  document.querySelectorAll(".tab, .panel").forEach(el => el.classList.remove("active"));
  document.querySelector(`.tab[data-tab="${tabName}"]`)?.classList.add("active");
  document.getElementById(tabName)?.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderSummary();
  renderProgress();
  renderGoals();
  renderPlan();
  renderHistory();
}

function renderSummary() {
  document.getElementById("streakValue").textContent = state.measurements.length;
  document.getElementById("monthLabel").textContent = new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" });

  const focus = document.getElementById("focusSummary");
  if (state.goals) {
    const map = { fatloss: "Fett verlieren & Umfang reduzieren", tone: "Straffer werden", fitness: "Fitter werden", muscle: "Muskeln aufbauen" };
    focus.textContent = `${map[state.goals.goal]} · ${state.goals.daysPerWeek}x/Woche · ${state.goals.minutes} Min. pro Einheit`;
  }

  const latest = [...state.measurements].sort((a,b) => b.date.localeCompare(a.date))[0];
  const latestBox = document.getElementById("latestMeasurement");
  if (!latest) {
    latestBox.textContent = "Noch keine Messung vorhanden.";
    return;
  }
  const bmiValue = bmi(latest.weight, latest.height);
  latestBox.innerHTML = `
    <strong>${formatDate(latest.date)}</strong>
    <div class="history-values">
      ${latest.waist ? `<span>Taille ${latest.waist} cm</span>` : ""}
      ${latest.hips ? `<span>Hüfte ${latest.hips} cm</span>` : ""}
      ${latest.weight ? `<span>Gewicht ${latest.weight} kg</span>` : ""}
      ${bmiValue ? `<span>BMI ${bmiValue}</span>` : ""}
    </div>
  `;
}

function renderProgress() {
  const grid = document.getElementById("progressGrid");
  if (state.measurements.length < 2) {
    grid.innerHTML = `<div class="empty-state">Speichere mindestens zwei Messungen, um Veränderungen zu sehen.</div>`;
    return;
  }
  const sorted = [...state.measurements].sort((a,b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const fields = [...cmFields, ...secondaryFields].filter(f => first[f] && last[f]);
  grid.innerHTML = fields.map(f => {
    const diff = (Number(last[f]) - Number(first[f])).toFixed(1);
    const unit = cmFields.includes(f) ? "cm" : (f === "weight" || f === "muscle" ? "kg" : "%");
    const goodDown = ["waist","belly","hips","weight","bodyFat"].includes(f);
    const cls = (goodDown ? diff <= 0 : diff >= 0) ? "positive" : "negative";
    const prefix = diff > 0 ? "+" : "";
    return `<div class="metric"><small>${measurementLabels[f]}</small><strong>${last[f]} ${unit}</strong><small class="${cls}">${prefix}${diff} ${unit} seit Start</small></div>`;
  }).join("") || `<div class="empty-state">Noch keine vergleichbaren Werte vorhanden.</div>`;
}

function renderGoals() {
  const form = document.getElementById("goalForm");
  if (!state.goals) return;
  Object.entries(state.goals).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
}

function renderPlan() {
  const key = monthKey();
  if (!state.plans[key]) generatePlanWithoutSaveLoop();
  const current = state.plans[key];
  const html = current.plan.map(day => `
    <div class="workout-day">
      <h3>${day.title} · ${day.focus}</h3>
      <p class="muted">${day.duration} · Pause: ${day.rest}</p>
      <p><strong>Warm-up:</strong> ${day.warmup}</p>
      <ol class="exercise-list">${day.exercises.map(e => `<li>${e}</li>`).join("")}</ol>
      <p><strong>Finisher:</strong> ${day.finisher}</p>
      <p class="muted">${day.progression}</p>
    </div>
  `).join("");
  document.getElementById("workoutPlan").innerHTML = html;
  document.getElementById("miniWorkoutPlan").innerHTML = current.plan.slice(0,2).map(day => `
    <div class="workout-day">
      <h3>${day.title}</h3>
      <p class="muted">${day.focus} · ${day.duration}</p>
    </div>
  `).join("");
}

function generatePlanWithoutSaveLoop() {
  const goals = state.goals || {
    goal: "fatloss", level: "beginner", daysPerWeek: 3, minutes: 30,
    equipment: "none", limitations: "none", monthlyGoal: ""
  };
  const key = monthKey();
  const bank = exerciseBank[goals.level] || exerciseBank.beginner;
  const days = Math.min(Math.max(Number(goals.daysPerWeek) || 3, 1), 6);
  const minutes = Math.min(Math.max(Number(goals.minutes) || 30, 10), 90);
  state.plans[key] = {
    createdAt: todayISO(),
    goals,
    plan: Array.from({ length: days }, (_, i) => ({
      title: `Trainingstag ${i + 1}`,
      duration: `${minutes} Minuten`,
      focus: i % 2 ? "Core & Oberkörper" : "Beine, Po & Ganzkörper",
      warmup: "5 Minuten Mobilität",
      exercises: bank[i % bank.length].map(e => `${e}: 2–3 Sätze x 10–15`),
      finisher: "2–3 Minuten kontrollierter Abschluss",
      progression: "Steigere dich langsam über Sätze, Wiederholungen oder Variante.",
      rest: "60 Sek."
    }))
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderHistory() {
  const list = document.getElementById("historyList");
  if (!state.measurements.length) {
    list.innerHTML = `<div class="empty-state">Noch keine Einträge gespeichert.</div>`;
    return;
  }
  const sorted = [...state.measurements].sort((a,b) => b.date.localeCompare(a.date));
  list.innerHTML = sorted.map(entry => {
    const values = Object.keys(measurementLabels)
      .filter(k => entry[k])
      .map(k => {
        const unit = cmFields.includes(k) ? "cm" : (k === "weight" || k === "muscle" ? "kg" : "%");
        return `<span>${measurementLabels[k]} ${entry[k]} ${unit}</span>`;
      }).join("");
    const bmiValue = bmi(entry.weight, entry.height);
    return `<div class="history-item">
      <h3>${formatDate(entry.date)}</h3>
      <div class="history-values">${values}${bmiValue ? `<span>BMI ${bmiValue}</span>` : ""}</div>
      ${entry.note ? `<p class="muted">${escapeHTML(entry.note)}</p>` : ""}
    </div>`;
  }).join("");
}

function formatDate(date) {
  return new Date(date + "T00:00:00").toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[m]));
}

document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
document.querySelectorAll("[data-jump]").forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.jump)));

document.getElementById("measurementForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  Object.keys(data).forEach(k => {
    if (data[k] === "") delete data[k];
  });
  data.id = crypto.randomUUID();
  state.measurements.push(data);
  event.target.reset();
  event.target.elements.date.value = todayISO();
  saveState();
  switchTab("dashboard");
});

document.getElementById("goalForm").addEventListener("submit", event => {
  event.preventDefault();
  state.goals = Object.fromEntries(new FormData(event.target).entries());
  delete state.plans[monthKey()];
  generatePlan();
  switchTab("workouts");
});

document.getElementById("regeneratePlan").addEventListener("click", () => {
  delete state.plans[monthKey()];
  generatePlan();
});

document.getElementById("exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `measurefit-export-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById("clearData").addEventListener("click", () => {
  if (confirm("Alle lokalen Daten wirklich löschen?")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
});

document.querySelector("#measurementForm [name=date]").value = todayISO();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}

renderAll();
