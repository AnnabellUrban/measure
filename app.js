const APP_VERSION = "1.0.0";
const DATA_VERSION = 1;
const STORAGE_KEY = "measurefit_data";
const LEGACY_KEYS = ["measurefit_v2", "measurefit_v1"];

const labels = {
  chest:"Brust", waist:"Taille", hips:"Hüfte", armLeft:"Oberarm L", armRight:"Oberarm R",
  thighLeft:"Oberschenkel L", thighRight:"Oberschenkel R", calfLeft:"Wade L", calfRight:"Wade R",
  weight:"Gewicht", bodyFat:"Körperfett", water:"Wasser", muscle:"Muskelmasse"
};
const cmFields = ["chest","waist","hips","armLeft","armRight","thighLeft","thighRight","calfLeft","calfRight"];
const allValueFields = [...cmFields, "weight","bodyFat","water","muscle"];

const quotes = [
  ["Du trainierst nicht für eine Zahl. Du trainierst für mehr Leichtigkeit.", "Jeder kleine Schritt ist ein Signal an deinen Körper: Ich kümmere mich um dich."],
  ["Mehr Bewegungsfreiheit beginnt mit einer einzigen Entscheidung.", "Heute darf sanft sein. Sanft ist nicht wenig."],
  ["Du tust es für ein schmerzärmeres Leben.", "Nicht perfekt. Nicht hart gegen dich. Einfach weiter."],
  ["Dein Fortschritt darf leise sein und trotzdem echt.", "Ein Zentimeter, ein Spaziergang, ein Training: Alles zählt."],
  ["Dein Körper ist kein Gegner. Er ist dein Zuhause.", "Heute arbeitest du mit ihm, nicht gegen ihn."],
  ["Die Waage erzählt nie die ganze Geschichte.", "Dein Maßband, dein Körpergefühl und deine Kraft zählen mit."],
  ["Regeneration ist kein Stillstand.", "Sie ist der Moment, in dem dein Körper aufholt."],
  ["Du musst dich nicht beweisen. Du darfst dich unterstützen.", "Kleine Routinen verändern große Dinge."],
  ["Jede Wiederholung ist ein Stück Selbstfürsorge.", "Nicht Strafe, sondern Fürsorge."],
  ["Heute zählt: weniger Druck, mehr Verbindung.", "Du bist mehr als ein Messwert."]
];

const challenges = [
  "10 Minuten Beine hochlagern.",
  "Ein Glas Wasser direkt nach dem Öffnen der App trinken.",
  "15 Minuten lockerer Spaziergang.",
  "5 Minuten sanfte Mobility für Hüfte und Rücken.",
  "Heute eine Treppe bewusst nehmen, wenn es sich gut anfühlt.",
  "3 Minuten tiefe Bauchatmung.",
  "Eine kurze Pause machen und die Beine bewegen.",
  "Eine Portion Gemüse oder Obst ergänzen.",
  "5 Minuten Wadenpumpe: Füße heben und senken.",
  "Kompression oder Selbstfürsorge bewusst einplanen, falls relevant.",
  "Heute eine Sache notieren, auf die du stolz bist.",
  "10 Minuten ohne Handy entspannen."
];

const exerciseInfo = {
  "Box Squat": ["🪑", "Setze dich kontrolliert auf eine stabile Kante und stehe wieder auf. Halte die Knie in Richtung der Zehen.", "Leichter: höhere Sitzfläche. Schwerer: langsamer absenken."],
  "Bodyweight Squat": ["🌸", "Füße hüft- bis schulterbreit, Hüfte nach hinten, Brust stolz. Drücke dich über die Fersen hoch.", "Leichter: Box Squat. Schwerer: Tempo Squat."],
  "Tempo Squat": ["⏳", "Senke dich 3 Sekunden ab, halte kurz und komme kontrolliert hoch.", "Achte auf ruhige Knie und saubere Kontrolle."],
  "Glute Bridge": ["🌉", "Rückenlage, Füße aufstellen, Becken anheben. Spüre Po und Beinrückseite.", "Schwerer: einbeinig oder mit Band."],
  "Wall Push-up": ["👐", "Hände an die Wand, Körper gerade, Brust Richtung Wand führen und wegdrücken.", "Schwerer: Hände tiefer, z. B. an Tischkante."],
  "Incline Push-up": ["📐", "Hände erhöht auf Sofa/Tisch, Körper stabil, langsam beugen und strecken.", "Leichter: höher abstützen. Schwerer: tiefer abstützen."],
  "Push-up": ["💪", "Körper als Linie halten, Ellenbogen kontrolliert beugen, aktiv wegdrücken.", "Leichter: erhöht oder auf Knien."],
  "Dead Bug": ["🐞", "Rückenlage, Bauchspannung, gegenüberliegenden Arm und Bein langsam strecken.", "Der Rücken bleibt ruhig am Boden."],
  "Bird Dog": ["🐦", "Vierfüßlerstand, Arm und Gegenbein strecken. Becken bleibt stabil.", "Ideal für Rücken und Core."],
  "Plank": ["✨", "Unterarme am Boden, Körper lang, Bauch aktiv. Halte nur so lange sauber möglich.", "Leichter: Knie ablegen."],
  "Side Plank": ["🌙", "Seitstütz mit gerader Körperlinie. Hebe die Hüfte aktiv an.", "Leichter: Knie ablegen."],
  "Reverse Lunge": ["↩️", "Schritt nach hinten, vorderes Bein arbeitet. Kontrolliert zurückkommen.", "Knieempfindlich? Ersetze durch Glute Bridge."],
  "Split Squat": ["🦵", "Versetzter Stand, senkrecht absenken und hochdrücken.", "Kleine Bewegung reicht am Anfang."],
  "Hip Hinge": ["🚪", "Hüfte nach hinten schieben, Rücken lang, dann wieder aufrichten.", "Gut für Po und Beinrückseite."],
  "Good Morning": ["☀️", "Hände an Brust oder Kopf, Hüfte nach hinten, Rücken neutral.", "Bei Rückenbeschwerden sanft oder ersetzen."],
  "Calf Raises": ["🦶", "Fersen langsam heben und senken. Kontrolliert, nicht wippen.", "Hilft Wadenmuskulatur und Alltagspumpe."],
  "Standing March": ["🚶‍♀️", "Aufrecht stehen, Knie abwechselnd heben, Arme locker mitnehmen.", "Low Impact und alltagstauglich."],
  "Low Impact Mountain Climber": ["🏔️", "Hände erhöht oder am Boden, Knie langsam Richtung Brust ziehen.", "Ohne Sprung, kontrolliert."],
  "Mountain Climbers": ["🏔️", "Im Stütz Knie abwechselnd Richtung Brust führen.", "Tempo nur, wenn Technik stabil bleibt."],
  "Side Steps": ["↔️", "Seitliche Schritte mit weichen Knien. Optional mit Band.", "Gut für Hüfte und Po."],
  "Band Pull Apart": ["➰", "Band vor der Brust auseinanderziehen, Schulterblätter sanft zusammenführen.", "Nacken locker lassen."],
  "Kurzhantel Row": ["🏋️", "Hüfte leicht zurück, Rücken lang, Hantel Richtung Rippen ziehen.", "Schulter weg vom Ohr."],
  "Mobility Flow": ["🌿", "Sanfte Kombination aus Hüftkreisen, Katzen-Kuh und Brustöffnung.", "Nicht auf Leistung, sondern auf Entlastung."]
};

const banks = {
  beginner: ["Box Squat","Glute Bridge","Wall Push-up","Dead Bug","Standing March","Calf Raises","Bird Dog","Side Steps"],
  returning: ["Bodyweight Squat","Glute Bridge","Incline Push-up","Dead Bug","Reverse Lunge","Hip Hinge","Side Plank","Low Impact Mountain Climber"],
  intermediate: ["Tempo Squat","Split Squat","Push-up","Plank","Mountain Climbers","Good Morning","Side Plank","Calf Raises"]
};

let state = loadAppState();

function createDefaultState() {
  return {
    appVersion: APP_VERSION,
    dataVersion: DATA_VERSION,
    profile: {},
    measurements: [],
    settings: {
      goal:"painfree", monthlyFocus:"consistency", level:"beginner", minutes:30,
      equipment:"none", limitations:"lowimpact", intensity:"balanced", days:["1","3","5"]
    },
    plans: {},
    completions: {},
    feedback: [],
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      migratedFrom: null
    }
  };
}

function normalizeState(raw, migratedFrom = null) {
  const base = createDefaultState();
  const normalized = {
    ...base,
    ...raw,
    appVersion: APP_VERSION,
    dataVersion: DATA_VERSION,
    profile: raw?.profile || {},
    measurements: Array.isArray(raw?.measurements) ? raw.measurements : [],
    settings: { ...base.settings, ...(raw?.settings || raw?.goals || {}) },
    plans: raw?.plans || {},
    completions: raw?.completions || {},
    feedback: Array.isArray(raw?.feedback) ? raw.feedback : [],
    meta: {
      ...base.meta,
      ...(raw?.meta || {}),
      migratedFrom: migratedFrom || raw?.meta?.migratedFrom || null,
      updatedAt: new Date().toISOString()
    }
  };

  // Legacy compatibility: v1/v2 used settings.days, but older variants may not.
  if (!Array.isArray(normalized.settings.days) || normalized.settings.days.length === 0) {
    normalized.settings.days = ["1","3","5"];
  }
  normalized.settings.days = normalized.settings.days.map(String);

  // Remove body values intentionally discontinued from active UI, but preserve old data fields if present.
  return normalized;
}

function loadAppState() {
  const current = readJSON(STORAGE_KEY);
  if (current) {
    const migrated = migrateState(current);
    persist(migrated);
    return migrated;
  }

  for (const key of LEGACY_KEYS) {
    const legacy = readJSON(key);
    if (legacy) {
      const migrated = migrateState(normalizeState(legacy, key));
      persist(migrated);
      return migrated;
    }
  }

  const fresh = createDefaultState();
  persist(fresh);
  return fresh;
}

function readJSON(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function migrateState(input) {
  let data = normalizeState(input, input?.meta?.migratedFrom);

  // Future migrations will be added here:
  // if (data.dataVersion < 2) data = migrateV1ToV2(data);
  // if (data.dataVersion < 3) data = migrateV2ToV3(data);

  data.dataVersion = DATA_VERSION;
  data.appVersion = APP_VERSION;
  data.meta.updatedAt = new Date().toISOString();
  return data;
}

function persist(data = state) {
  data.appVersion = APP_VERSION;
  data.dataVersion = DATA_VERSION;
  data.meta = data.meta || {};
  data.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function save() {
  persist(state);
  render();
}

function todayISO(){ return new Date().toISOString().slice(0,10); }
function monthKey(){ return new Date().toISOString().slice(0,7); }
function dayOfYear(){ const n = new Date(); const s = new Date(n.getFullYear(),0,0); return Math.floor((n-s)/86400000); }
function formatDate(d){ return new Date(d+"T00:00:00").toLocaleDateString("de-DE", {day:"2-digit", month:"long", year:"numeric"}); }
function bmi(w,h){ if(!w||!h) return null; const m=Number(h)/100; return (Number(w)/(m*m)).toFixed(1); }
function sortedMeasurements(){ return [...state.measurements].sort((a,b)=>a.date.localeCompare(b.date)); }

function switchScreen(id) {
  document.querySelectorAll(".screen,.nav-item").forEach(el => el.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
  document.querySelector(`.nav-item[data-screen="${id}"]`)?.classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}

function currentPlan() {
  const key = monthKey();
  if (!state.plans[key]) {
    state.plans[key] = generatePlan();
    persist(state);
  }
  return state.plans[key];
}

function lastEffortAdjustment() {
  const last = state.feedback[state.feedback.length-1]?.effort;
  if (last === "tooEasy") return 1;
  if (last === "tooHard") return -1;
  return 0;
}

function generatePlan() {
  const s = state.settings;
  let list = [...(banks[s.level] || banks.beginner)];
  if (s.monthlyFocus === "mobility" || s.limitations === "swelling") list = ["Mobility Flow","Glute Bridge","Calf Raises","Standing March","Dead Bug","Bird Dog","Side Steps"];
  if (s.monthlyFocus === "lowerbody") list = ["Box Squat","Glute Bridge","Side Steps","Calf Raises","Hip Hinge","Reverse Lunge","Mobility Flow"];
  if (s.monthlyFocus === "core") list = ["Dead Bug","Bird Dog","Plank","Side Plank","Glute Bridge","Mobility Flow"];
  if (s.monthlyFocus === "endurance") list = ["Standing March","Side Steps","Low Impact Mountain Climber","Calf Raises","Bodyweight Squat","Mobility Flow"];
  if (s.equipment === "bands") list.push("Band Pull Apart");
  if (s.equipment === "dumbbells" || s.equipment === "mixed") list.push("Kurzhantel Row");
  if (s.limitations === "knees") list = list.map(x => ["Reverse Lunge","Split Squat","Tempo Squat"].includes(x) ? "Glute Bridge" : x);
  if (s.limitations === "back") list = list.map(x => ["Good Morning"].includes(x) ? "Bird Dog" : x);
  if (s.limitations === "lowimpact") list = list.map(x => x === "Mountain Climbers" ? "Low Impact Mountain Climber" : x);

  const adj = lastEffortAdjustment();
  const baseSets = s.intensity === "gentle" ? 2 : s.intensity === "strong" ? 4 : 3;
  const sets = Math.max(1, baseSets + adj);
  const reps = s.goal === "muscle" ? "8–12" : s.goal === "painfree" ? "8–10 ruhig" : "10–15";
  const days = s.days?.length ? s.days : ["1","3","5"];

  return {
    createdAt: todayISO(),
    settings: {...s},
    days: days.map((weekday, i) => {
      const chosen = [0,1,2,3,4].map(n => list[(i*2+n) % list.length]);
      return {
        weekday,
        title: s.monthlyFocus === "mobility" ? "Sanftes Mobility-Training" : i % 2 ? "Core & Oberkörper" : "Ganzkörper & Beine",
        minutes: s.minutes,
        sets, reps,
        exercises: [...new Set(chosen)].slice(0,5)
      };
    })
  };
}

function render() {
  renderQuote();
  renderOverview();
  renderBody();
  renderWorkouts();
  renderSettings();
}

function renderQuote() {
  const q = quotes[dayOfYear() % quotes.length];
  document.getElementById("dailyQuote").textContent = q[0];
  document.getElementById("dailySubquote").textContent = q[1];
  document.getElementById("dailyChallenge").textContent = challenges[dayOfYear() % challenges.length];
  document.getElementById("challengeCheck").checked = !!state.completions[`challenge_${todayISO()}`];
}

function renderOverview() {
  document.getElementById("totalEntries").textContent = `${state.measurements.length} Einträge`;
  const stats = calcOverallStats();
  document.getElementById("overallStats").innerHTML = `
    <div class="stat"><small>Gesamtumfang</small><strong>${stats.cmChange}</strong><small class="${stats.cmClass}">seit Start</small></div>
    <div class="stat"><small>Workouts</small><strong>${stats.workouts}</strong><small>abgeschlossen</small></div>
    <div class="stat"><small>Körperfett</small><strong>${stats.fat}</strong><small>Veränderung</small></div>
    <div class="stat"><small>Muskelmasse</small><strong>${stats.muscle}</strong><small>Veränderung</small></div>
    <div class="stat"><small>Tageschallenges</small><strong>${stats.challenges}</strong><small>geschafft</small></div>
  `;
  renderTodayWorkout();
  renderWeekStrip();
}

function calcOverallStats() {
  const sorted = sortedMeasurements();
  let cmChange = "–", cmClass = "";
  if (sorted.length >= 2) {
    const first = sorted[0], last = sorted[sorted.length-1];
    const diff = cmFields.reduce((sum,f)=> first[f]&&last[f] ? sum + (Number(last[f])-Number(first[f])) : sum, 0);
    cmChange = `${diff > 0 ? "+" : ""}${diff.toFixed(1)} cm`;
    cmClass = diff <= 0 ? "positive" : "negative";
  }
  const completedKeys = Object.keys(state.completions || {});
  const workouts = completedKeys.filter(k => k.startsWith("workout_") && state.completions[k] === true).length;
  const challengesDone = completedKeys.filter(k => k.startsWith("challenge_") && state.completions[k] === true).length;
  const fat = changeFor("bodyFat", "%");
  const muscle = changeFor("muscle", "kg");
  return { cmChange, cmClass, workouts, challenges: challengesDone, fat, muscle };
}

function changeFor(field, unit) {
  const sorted = sortedMeasurements().filter(x => x[field]);
  if (sorted.length < 2) return "–";
  const diff = Number(sorted[sorted.length-1][field]) - Number(sorted[0][field]);
  return `${diff > 0 ? "+" : ""}${diff.toFixed(1)} ${unit}`;
}

function renderTodayWorkout() {
  const today = String(new Date().getDay());
  const plan = currentPlan();
  const dayPlan = plan.days.find(d => d.weekday === today);
  const box = document.getElementById("todayWorkout");
  const pill = document.getElementById("todayPill");
  if (!dayPlan) {
    document.getElementById("todayTitle").textContent = "Heute hast du frei";
    pill.textContent = "Regeneration";
    box.innerHTML = `<h3>🌿 Regenerationstag</h3><p class="muted">Dein Körper wird nicht nur durch Training stärker, sondern auch durch Erholung. Ein Spaziergang, Beine hochlagern oder sanfte Mobility reichen heute völlig.</p>`;
    return;
  }
  document.getElementById("todayTitle").textContent = dayPlan.title;
  pill.textContent = `${dayPlan.minutes} Min.`;
  box.innerHTML = `
    <h3>${dayPlan.title}</h3>
    <p class="muted">${dayPlan.sets} Sätze · ${dayPlan.reps} Wiederholungen · ruhig und kontrolliert</p>
    <div class="today-checks">
      ${dayPlan.exercises.map(ex => {
        const key = `today_${todayISO()}_${ex}`;
        return `<label class="check-row"><input type="checkbox" class="exercise-check" data-key="${key}" ${state.completions[key] ? "checked" : ""}>${ex}</label>`;
      }).join("")}
    </div>
    <button class="primary complete-workout">Training abschließen</button>
  `;
}

function renderWeekStrip() {
  const names = ["So","Mo","Di","Mi","Do","Fr","Sa"];
  const today = new Date().getDay();
  const days = state.settings.days || [];
  document.getElementById("weekStrip").innerHTML = names.map((n,i)=>`
    <div class="week-day ${i===today?"today":""} ${days.includes(String(i))?"train":"rest"}">
      <div>${n}</div><small>${days.includes(String(i))?"🏋🏽":"🌿"}</small>
    </div>`).join("");
}

function renderBody() {
  const form = document.getElementById("bodyForm");
  if (!form.elements.date.value) form.elements.date.value = todayISO();
  updateDiffHints();
  renderWeightStats();
  renderHistory();
}

function updateDiffHints() {
  const last = sortedMeasurements().at(-1);
  document.querySelectorAll("[data-diff]").forEach(el => {
    const f = el.dataset.diff;
    const current = document.querySelector(`[name="${f}"]`)?.value;
    if (!last || !last[f]) { el.textContent = ""; return; }
    if (!current) { el.textContent = `Letzter Wert: ${last[f]}`; el.className = ""; return; }
    const diff = Number(current) - Number(last[f]);
    const unit = cmFields.includes(f) ? "cm" : (f==="weight"||f==="muscle" ? "kg" : "%");
    el.textContent = `${diff > 0 ? "+" : ""}${diff.toFixed(1)} ${unit} seit letzter Messung`;
    el.className = diff <= 0 && ["waist","hips","chest","armLeft","armRight","thighLeft","thighRight","calfLeft","calfRight","weight","bodyFat"].includes(f) ? "positive" : "";
  });
}

function renderWeightStats() {
  const values = sortedMeasurements().filter(x=>x.weight);
  const box = document.getElementById("weightStats");
  if (!values.length) {
    box.innerHTML = `<div class="stat"><small>Gewicht</small><strong>–</strong><small>Noch keine Daten</small></div>`;
    document.getElementById("weightChart").innerHTML = "";
    return;
  }
  const first = values[0], last = values[values.length-1];
  const diff = (Number(last.weight)-Number(first.weight)).toFixed(1);
  const b = bmi(last.weight, last.height);
  box.innerHTML = `
    <div class="stat"><small>Aktuell</small><strong>${last.weight} kg</strong><small>${formatDate(last.date)}</small></div>
    <div class="stat"><small>Veränderung</small><strong>${diff>0?"+":""}${diff} kg</strong><small>seit Start</small></div>
    <div class="stat"><small>BMI</small><strong>${b || "–"}</strong><small>automatisch</small></div>
  `;
  const weights = values.map(x=>Number(x.weight));
  const min = Math.min(...weights), max = Math.max(...weights);
  document.getElementById("weightChart").innerHTML = weights.map(w => {
    const h = max === min ? 60 : 30 + ((w-min)/(max-min))*80;
    return `<div class="bar" title="${w} kg" style="height:${h}px"></div>`;
  }).join("");
}

function renderHistory() {
  const list = document.getElementById("historyList");
  const sorted = sortedMeasurements().reverse();
  if (!sorted.length) { list.innerHTML = `<p class="muted">Noch keine Messungen gespeichert.</p>`; return; }
  list.innerHTML = sorted.map(entry => `
    <div class="history-item">
      <h3>${formatDate(entry.date)}</h3>
      <div class="history-values">
        ${allValueFields.filter(f=>entry[f]).map(f => {
          const unit = cmFields.includes(f) ? "cm" : (f==="weight"||f==="muscle" ? "kg" : "%");
          return `<span>${labels[f]} ${entry[f]} ${unit}</span>`;
        }).join("")}
        ${bmi(entry.weight, entry.height) ? `<span>BMI ${bmi(entry.weight, entry.height)}</span>` : ""}
      </div>
      ${entry.note ? `<p class="muted">${escapeHTML(entry.note)}</p>` : ""}
    </div>
  `).join("");
}

function renderWorkouts() {
  const plan = currentPlan();
  const weekdayNames = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
  document.getElementById("workoutPlan").innerHTML = plan.days.map(day => `
    <div class="workout-day">
      <h3>${weekdayNames[Number(day.weekday)]}: ${day.title}</h3>
      <p class="muted">${day.minutes} Minuten · ${day.sets} Sätze · ${day.reps} Wiederholungen</p>
      <div class="exercise-list">
        ${day.exercises.map(ex => exerciseHTML(ex)).join("")}
      </div>
    </div>
  `).join("");
}

function exerciseHTML(name) {
  const info = exerciseInfo[name] || ["✦", "Führe die Übung kontrolliert aus und achte auf saubere Technik.", "Passe Tempo und Bewegungsradius an dein Körpergefühl an."];
  return `<details class="exercise-card">
    <summary><span class="exercise-illustration">${info[0]}</span>${name}</summary>
    <p><strong>So geht's:</strong> ${info[1]}</p>
    <p><strong>Anpassung:</strong> ${info[2]}</p>
  </details>`;
}

function renderSettings() {
  const form = document.getElementById("settingsForm");
  const s = state.settings;
  Object.entries(s).forEach(([k,v]) => {
    if (k === "days") return;
    if (form.elements[k]) form.elements[k].value = v;
  });
  form.querySelectorAll('input[name="days"]').forEach(cb => cb.checked = (s.days || []).includes(cb.value));
}

function exportBackup() {
  const backup = {
    exportedAt: new Date().toISOString(),
    source: "MeasureFit",
    appVersion: APP_VERSION,
    dataVersion: DATA_VERSION,
    data: state
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `measurefit-backup-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = event => {
    try {
      const parsed = JSON.parse(event.target.result);
      const imported = parsed.data || parsed;
      const migrated = migrateState(imported);
      state = migrated;
      persist(state);
      alert("Backup wurde erfolgreich importiert.");
      render();
      switchScreen("overview");
    } catch {
      alert("Das Backup konnte nicht gelesen werden. Bitte prüfe die JSON-Datei.");
    }
  };
  reader.readAsText(file);
}

function escapeHTML(str){ return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => switchScreen(btn.dataset.screen)));

document.addEventListener("change", e => {
  if (e.target.matches("#challengeCheck")) {
    state.completions[`challenge_${todayISO()}`] = e.target.checked;
    save();
  }
  if (e.target.matches(".exercise-check")) {
    state.completions[e.target.dataset.key] = e.target.checked;
    persist(state);
  }
  if (e.target.closest("#bodyForm")) updateDiffHints();
  if (e.target.matches("#importData")) importBackup(e.target.files[0]);
});

document.addEventListener("input", e => {
  if (e.target.closest("#bodyForm")) updateDiffHints();
});

document.addEventListener("click", e => {
  if (e.target.matches(".complete-workout")) {
    state.completions[`workout_${todayISO()}`] = true;
    save();
  }
});

document.getElementById("bodyForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  Object.keys(data).forEach(k => { if (data[k] === "") delete data[k]; });
  data.id = crypto.randomUUID();
  state.measurements.push(data);
  e.target.reset();
  e.target.elements.date.value = todayISO();
  save();
  switchScreen("overview");
});

document.getElementById("settingsForm").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  state.settings = {
    goal: fd.get("goal"),
    monthlyFocus: fd.get("monthlyFocus"),
    level: fd.get("level"),
    minutes: Number(fd.get("minutes")),
    equipment: fd.get("equipment"),
    limitations: fd.get("limitations"),
    intensity: fd.get("intensity"),
    days: fd.getAll("days")
  };
  state.plans[monthKey()] = generatePlan();
  save();
  switchScreen("overview");
});

document.querySelectorAll(".feedback").forEach(btn => btn.addEventListener("click", () => {
  state.feedback.push({date: todayISO(), effort: btn.dataset.effort});
  state.plans[monthKey()] = generatePlan();
  save();
  alert("Danke. Dein nächster Plan wird daran angepasst.");
}));

document.getElementById("regeneratePlan").addEventListener("click", () => {
  state.plans[monthKey()] = generatePlan();
  save();
});

document.getElementById("exportData").addEventListener("click", exportBackup);
document.getElementById("exportDataSettings").addEventListener("click", exportBackup);

document.getElementById("clearData").addEventListener("click", () => {
  if (confirm("Alle lokalen Daten wirklich löschen? Bitte vorher ein Backup erstellen, falls du sie behalten möchtest.")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
});

document.querySelector('#bodyForm [name="date"]').value = todayISO();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}

render();
