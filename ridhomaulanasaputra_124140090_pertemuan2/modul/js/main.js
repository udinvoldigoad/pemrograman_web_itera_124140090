import { demos } from './demos.js';
import { exercises } from './exercises.js';
import { escapeHtml } from '../../js/modules/utils.js';

const entries = [...demos.map(([title, description, run], index) => ({ title, description, run, group: 'demo', index })), ...exercises.map(([title, run], index) => ({ title, description: 'Solusi latihan mandiri dari materi Pertemuan 2.', run, group: 'exercise', index }))];
for (const group of ['demo', 'exercise']) document.querySelector(`#${group}-grid`).innerHTML = entries.filter(entry => entry.group === group).map(({ title, description, index }) => `<article class="lab-card"><p class="eyebrow">${group === 'demo' ? 'DEMO' : 'LATIHAN'} ${String(index + 1).padStart(2, '0')}</p><h2>${escapeHtml(title)}</h2><p>${description}</p><button class="button secondary" data-run="${group}-${index}">Jalankan</button><p class="lab-status" id="status-${group}-${index}" role="status"></p><pre id="output-${group}-${index}" hidden></pre></article>`).join('');
let running = false;
async function execute(entry) {
  const key = `${entry.group}-${entry.index}`; const output = document.querySelector(`#output-${key}`); const status = document.querySelector(`#status-${key}`); const button = document.querySelector(`[data-run="${key}"]`);
  button.disabled = true; status.textContent = 'Memuat…'; output.hidden = false; output.textContent = 'Operasi sedang berjalan…';
  try { const result = await entry.run(); output.textContent = typeof result === 'string' ? result : JSON.stringify(result, null, 2); status.textContent = 'Selesai'; console.log(entry.title, result); }
  catch (error) { output.textContent = error.message; status.textContent = 'Gagal'; }
  finally { button.disabled = false; }
}
const setBusy = value => { running = value; document.querySelectorAll('.lab-controls button').forEach(button => { button.disabled = value; }); document.querySelector('#lab-notice').textContent = value ? 'Menjalankan demo. Tunggu sampai semua operasi selesai.' : 'Eksekusi selesai.'; };
document.addEventListener('click', async event => { const button = event.target.closest('[data-run]'); if (!button || running) return; const entry = entries.find(item => `${item.group}-${item.index}` === button.dataset.run); setBusy(true); try { await execute(entry); } finally { setBusy(false); } });
for (const [id, group] of [['run-all', 'demo'], ['run-exercises', 'exercise']]) document.querySelector(`#${id}`).addEventListener('click', async () => { if (running) return; setBusy(true); try { await Promise.all(entries.filter(entry => entry.group === group).map(execute)); } finally { setBusy(false); } });
document.querySelector('#clear').addEventListener('click', () => { if (running) return; document.querySelectorAll('.lab-card pre').forEach(output => { output.textContent = ''; output.hidden = true; }); document.querySelectorAll('.lab-status').forEach(status => { status.textContent = ''; }); document.querySelector('#lab-notice').textContent = 'Output dibersihkan.'; });
