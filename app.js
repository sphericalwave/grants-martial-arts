/* ── DATA ── */
const schedule = {
  mon: [
    { time: '12:00 PM', name: 'BJJ Fundamentals', discipline: 'bjj', level: 'fund' },
    { time: '5:30 PM',  name: 'Kids BJJ',         discipline: 'kids', level: 'kids' },
    { time: '6:30 PM',  name: 'Muay Thai',        discipline: 'muaythai', level: 'all' },
    { time: '7:30 PM',  name: 'BJJ Advanced',     discipline: 'bjj', level: 'adv' },
  ],
  tue: [
    { time: '12:00 PM', name: 'Open Mat',         discipline: 'bjj', level: 'all' },
    { time: '5:30 PM',  name: 'Muay Thai Basics', discipline: 'muaythai', level: 'fund' },
    { time: '6:30 PM',  name: 'MMA Conditioning', discipline: 'mma', level: 'adv' },
    { time: '7:30 PM',  name: 'AJJ / No-Gi',      discipline: 'ajj', level: 'all' },
  ],
  wed: [
    { time: '12:00 PM', name: 'BJJ Fundamentals', discipline: 'bjj', level: 'fund' },
    { time: '5:30 PM',  name: 'Kids Muay Thai',   discipline: 'kids', level: 'kids' },
    { time: '6:30 PM',  name: 'Muay Thai Power',  discipline: 'muaythai', level: 'adv' },
    { time: '7:30 PM',  name: 'BJJ Drilling',     discipline: 'bjj', level: 'all' },
  ],
  thu: [
    { time: '12:00 PM', name: 'Open Mat',         discipline: 'bjj', level: 'all' },
    { time: '5:30 PM',  name: 'BJJ Fundamentals', discipline: 'bjj', level: 'fund' },
    { time: '6:30 PM',  name: 'AJJ Leg Locks',    discipline: 'ajj', level: 'adv' },
    { time: '7:30 PM',  name: 'MMA Sparring',     discipline: 'mma', level: 'adv' },
  ],
  fri: [
    { time: '12:00 PM', name: 'BJJ Fundamentals', discipline: 'bjj', level: 'fund' },
    { time: '5:30 PM',  name: 'Muay Thai',        discipline: 'muaythai', level: 'all' },
    { time: '6:30 PM',  name: 'BJJ Advanced',     discipline: 'bjj', level: 'adv' },
    { time: '7:30 PM',  name: 'No-Gi Grappling',  discipline: 'ajj', level: 'all' },
  ],
  sat: [
    { time: '10:00 AM', name: 'BJJ Open Mat',     discipline: 'bjj', level: 'all' },
    { time: '11:30 AM', name: 'Kids Program',     discipline: 'kids', level: 'kids' },
    { time: '1:00 PM',  name: 'Muay Thai',        discipline: 'muaythai', level: 'all' },
  ],
};

const levelLabel = { fund: 'Fundamentals', adv: 'Advanced', all: 'All Levels', kids: 'Kids' };
const levelClass = { fund: 'level-fund', adv: 'level-adv', all: 'level-all', kids: 'level-kids' };
const dayLabels  = { mon:'Monday', tue:'Tuesday', wed:'Wednesday', thu:'Thursday', fri:'Friday', sat:'Saturday' };

/* ── PAGE LOADER ── */
const loadedPages = new Set();

async function loadPage(id) {
  if (loadedPages.has(id)) return;
  const res = await fetch(`pages/${id}.html`);
  const html = await res.text();
  const div = document.createElement('div');
  div.id = 'page-' + id;
  div.className = 'page';
  div.innerHTML = html;
  document.getElementById('app-container').appendChild(div);
  loadedPages.add(id);
  if (id === 'home') { renderPreview('mon'); }
  if (id === 'schedule') { renderFullSchedule('all'); }
}

/* ── NAVIGATION ── */
async function showPage(id) {
  await loadPage(id);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-links a, .nav-drawer-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  const drawerEl = document.getElementById('drawer-' + id);
  if (drawerEl) drawerEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileNav() {
  document.body.classList.toggle('nav-open');
  document.querySelector('nav').classList.toggle('nav-open');
}
function closeMobileNav() {
  document.body.classList.remove('nav-open');
  document.querySelector('nav').classList.remove('nav-open');
}

/* ── SCHEDULE PREVIEW (HOME) ── */
let currentDay = 'mon';

function renderPreview(day) {
  const el = document.getElementById('schedulePreview');
  if (!el) return;
  el.innerHTML = schedule[day].map(c => `
    <div class="class-row">
      <span class="class-time">${c.time}</span>
      <span class="class-name">${c.name}</span>
      <span class="class-level ${levelClass[c.level]}">${levelLabel[c.level]}</span>
    </div>`).join('');
}

function switchDay(btn, day) {
  document.querySelectorAll('#dayTabs .day-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentDay = day;
  renderPreview(day);
}

/* ── FULL SCHEDULE (SCHEDULE PAGE) ── */
let schedFilter = 'all';

function renderFullSchedule(filter) {
  const el = document.getElementById('fullSchedule');
  if (!el) return;
  let html = '';
  const days = filter === 'all' ? Object.keys(schedule) : [filter];
  days.forEach(day => {
    if (filter === 'all') {
      html += `<div style="font-family:'Bebas Neue',sans-serif; font-size:1.5rem; letter-spacing:0.06em; margin:1.5rem 0 0.75rem; color:var(--primary);">${dayLabels[day]}</div>`;
    }
    schedule[day].forEach(c => {
      html += `
        <div class="sched-row ${c.discipline === 'bjj' ? 'blue-accent' : ''}">
          <span class="class-time">${c.time}</span>
          <span class="class-name">${c.name}</span>
          <span class="discipline-badge ${c.discipline}">${c.discipline.toUpperCase()}</span>
          <span class="class-level ${levelClass[c.level]}">${levelLabel[c.level]}</span>
        </div>`;
    });
  });
  el.innerHTML = html;
}

function switchSchedPage(btn, filter) {
  document.querySelectorAll('#schedPageTabs .sched-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  schedFilter = filter;
  renderFullSchedule(filter);
}

/* ── SURVEY ── */
let currentStep = 1;

function updateProgress() {
  const pct = currentStep === 'complete' ? 100 : (currentStep / 3) * 100;
  document.getElementById('surveyProgressBar').style.width = pct + '%';
}

function goStep(n) {
  document.getElementById('step' + currentStep).classList.remove('active');
  currentStep = n;
  document.getElementById('step' + n).classList.add('active');
  updateProgress();
}

function completeSurvey() {
  document.getElementById('step' + currentStep).classList.remove('active');
  document.getElementById('stepComplete').classList.add('active');
  currentStep = 'complete';
  updateProgress();
}

function toggleOption(el) {
  el.classList.toggle('selected');
}

function selectSingle(el) {
  el.closest('.option-grid').querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
}

/* ── BILLING TOGGLE ── */
const billingPrices = {
  monthly: { single: '$110<span style="color:var(--text-muted);font-size:0.9375rem;">/mo + tax</span>', combo: '$130<span style="color:var(--text-muted);font-size:0.9375rem;">/mo + tax</span>' },
  '6month': { single: '$600<span style="color:var(--text-muted);font-size:0.9375rem;"> + tax</span>', combo: '$720<span style="color:var(--text-muted);font-size:0.9375rem;"> + tax</span>' },
  annual:   { single: '$1,080<span style="color:var(--text-muted);font-size:0.9375rem;"> + tax</span>', combo: '$1,320<span style="color:var(--text-muted);font-size:0.9375rem;"> + tax</span>' },
};

function switchBilling(btn, period) {
  document.querySelectorAll('#billingTabs .sched-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const p = billingPrices[period];
  document.getElementById('price-bjj-mt').innerHTML =
    `<span style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--text);line-height:1;">${p.single}</span>`;
  document.getElementById('price-bjj-mt-combo').innerHTML =
    `<span style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--primary);line-height:1;">${p.combo}</span>`;
}

/* ── INIT ── */
showPage('home');
