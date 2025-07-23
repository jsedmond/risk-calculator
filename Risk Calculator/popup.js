// popup.js  (v2.0 — supports hard & soft stop‑loss distances)

/* ─── DOM elements ─────────────────────────────── */
const symbolEl  = document.getElementById('symbol');
const riskEl    = document.getElementById('risk');
const hardEl    = document.getElementById('hardStop');
const softEl    = document.getElementById('softStop');
const halfBtn   = document.getElementById('halfR');
const fullBtn   = document.getElementById('fullR');
const calcBtn   = document.getElementById('calc');
const out       = document.getElementById('results');

/* ─── ½ R / Full R toggle ───────────────────────── */
let riskMult = 1;
halfBtn.onclick = () => { riskMult = 0.5; halfBtn.classList.add('active'); fullBtn.classList.remove('active'); };
fullBtn.onclick = () => { riskMult = 1;   fullBtn.classList.add('active');  halfBtn.classList.remove('active'); };

/* ─── calculation helper ───────────────────────── */
function blockHTML(stopPts, label, perPoint, baseRisk) {
  const real  = baseRisk / (perPoint * stopPts);
  const floor = Math.floor(real);
  const ceil  = Math.ceil(real);
  const riskFloor = floor * perPoint * stopPts;
  const riskCeil  = ceil  * perPoint * stopPts;

  return `
    <h3>${label} (${stopPts} pts)</h3>
    Real Contract Size: <strong>${real.toFixed(2)}</strong><br>
    Fixed Size (Floor): <strong>${floor}</strong><br>
    Risk for Floor: $<strong>${riskFloor.toFixed(2)}</strong><br>
    Fixed Size (Ceiling): <strong>${ceil}</strong><br>
    Risk for Ceiling: $<strong>${riskCeil.toFixed(2)}</strong>
  `;
}

/* ─── main click handler ───────────────────────── */
calcBtn.onclick = () => {
  const perPoint = +symbolEl.value;
  const baseRisk = +riskEl.value * riskMult;
  const hardPts  = +hardEl.value;

  // null‑safe soft‑stop handling
  const softRaw  = softEl ? softEl.value.trim() : '';
  const softPts  = softRaw ? +softRaw : null;

  /* ── validation ─────────────────────────────── */
  if (!perPoint || !baseRisk || !hardPts) {
    out.textContent = 'Fill in symbol, risk, and hard stop‑loss first.'; return;
  }
  if (softPts !== null && softPts <= 0) {
    out.textContent = 'Soft stop‑loss must be > 0 pts (or leave blank).'; return;
  }
  /* NEW rule → soft < hard */
  if (softPts !== null && softPts >= hardPts) {
    out.textContent = 'Soft stop must be **smaller** than hard stop.'; return;
  }

  /* ── output ─────────────────────────────────── */
  let html = blockHTML(hardPts, 'Hard Stop', perPoint, baseRisk);
  if (softPts !== null) html += '<hr>' + blockHTML(softPts, 'Soft Stop', perPoint, baseRisk);

  out.innerHTML = html;
};
