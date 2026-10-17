import { DashboardApp } from './app.js';
import { sampleTasks } from './modules/data.js';
import { escapeHtml as safe, formatDate, priorityLabel, deadlineLabel, todayKey } from './modules/utils.js';

const $ = (selector) => document.querySelector(selector);
let app;
try { app = new DashboardApp(); } catch { app = new DashboardApp({ getItem() { throw new Error(); } }); }
let activeFilter = 'all';
let deleteId = null;
let toastTimer;
const notify = (message) => { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').hidden = false; toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 5000); };
const taskMarkup = ({ id, title, course, deadline, priority, notes, completed, overdue }) => `
  <article class="task-row ${completed ? 'completed' : ''}">
    <input type="checkbox" class="task-check" data-toggle="${safe(id)}" ${completed ? 'checked' : ''} aria-label="${safe(completed ? 'Tandai belum selesai: ' : 'Selesaikan: ')}${safe(title)}">
    <div class="task-content"><div class="task-title-line"><h3>${safe(title)}</h3><span class="priority ${priority}">${priorityLabel(priority)}</span></div><p class="task-course">${safe(course)}</p>${notes ? `<p class="task-notes">${safe(notes)}</p>` : ''}<div class="task-meta"><time datetime="${deadline}">${formatDate(deadline)}</time><span class="${overdue ? 'overdue' : ''}">${completed ? 'Selesai' : deadlineLabel(deadline)}</span></div></div>
    <div class="task-actions"><button data-edit="${safe(id)}" aria-label="Edit ${safe(title)}">Edit</button><button data-delete="${safe(id)}" aria-label="Hapus ${safe(title)}">Hapus</button></div>
  </article>`;

function render() {
  const tasks = app.select({ query: $('#search').value, status: activeFilter, sort: $('#sort').value });
  $('#task-list').innerHTML = tasks.map(taskMarkup).join('');
  $('#task-count').textContent = `${tasks.length} ditampilkan`;
  const { total, pending, done, overdue } = app.summary;
  Object.entries({ total, pending, done, overdue }).forEach(([key, value]) => { $(`#stat-${key}`).textContent = value; });
  const percent = total ? Math.round(done / total * 100) : 0;
  $('#progress-percent').textContent = `${percent}%`; $('#progress').value = percent;
  $('#progress-message').textContent = total && done === total ? 'Semua tugas selesai. Saatnya menikmati jeda!' : `${done} dari ${total} tugas selesai. Satu langkah lagi hari ini?`;
  $('#empty-state').hidden = tasks.length > 0;
  $('#sample-tasks').hidden = total > 0 || Boolean(app.loadError);
  $('#empty-title').textContent = total ? 'Tidak ada tugas yang cocok' : 'Mulai rencana belajarmu';
  $('#empty-description').textContent = app.loadError || (total ? 'Coba kata kunci lain atau ubah filter status.' : 'Tambahkan tugas pertama atau gunakan data contoh untuk mencoba dashboard.');
  const next = app.select().find(task => !task.completed);
  $('#next-deadline').innerHTML = next ? `<p class="next-course">${safe(next.course)}</p><h3>${safe(next.title)}</h3><time datetime="${next.deadline}">${formatDate(next.deadline)}</time><p class="deadline-caption ${next.overdue ? 'overdue' : ''}">${deadlineLabel(next.deadline)}</p>` : '<p class="muted">Belum ada deadline. Tambahkan rencana belajarmu berikutnya.</p>';
}
function openForm(task) {
  $('#task-form').reset(); $('#form-error').textContent = '';
  $('#dialog-title').textContent = task ? 'Edit tugas' : 'Tambah tugas';
  $('#task-id').value = task?.id || '';
  ['title', 'course', 'deadline', 'priority', 'notes'].forEach(key => { $(`#${key}`).value = task?.[key] ?? (key === 'priority' ? 'medium' : key === 'deadline' ? todayKey() : ''); });
  $('#task-dialog').showModal(); $('#title').focus();
}
$('#add-task').addEventListener('click', () => openForm());
['close-dialog', 'cancel-dialog'].forEach(id => $(`#${id}`).addEventListener('click', () => $('#task-dialog').close()));
$('#task-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  try { const id = $('#task-id').value; id ? app.update(id, data) : app.add(data); render(); $('#task-dialog').close(); notify(id ? 'Perubahan tugas tersimpan.' : 'Tugas baru ditambahkan.'); }
  catch (error) { $('#form-error').textContent = error.message; }
});
$('#task-list').addEventListener('click', event => {
  const edit = event.target.closest('[data-edit]'); const remove = event.target.closest('[data-delete]');
  if (edit) openForm(app.tasks.find(({ id }) => id === edit.dataset.edit));
  if (remove) { deleteId = remove.dataset.delete; const task = app.tasks.find(({ id }) => id === deleteId); $('#delete-description').textContent = `Hapus “${task.title}” dari daftar tugas?`; $('#delete-dialog').showModal(); $('#cancel-delete').focus(); }
});
$('#task-list').addEventListener('change', event => {
  if (!event.target.matches('[data-toggle]')) return;
  try { app.update(event.target.dataset.toggle, { completed: event.target.checked }); render(); notify('Status tugas tersimpan.'); }
  catch (error) { render(); notify(error.message); }
});
$('#cancel-delete').addEventListener('click', () => $('#delete-dialog').close());
$('#confirm-delete').addEventListener('click', () => { try { app.remove(deleteId); render(); $('#delete-dialog').close(); notify('Tugas dihapus.'); } catch (error) { notify(error.message); } });
$('#search').addEventListener('input', render); $('#sort').addEventListener('change', render);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); render(); }));
$('#sample-tasks').addEventListener('click', () => { try { app.seed(sampleTasks); render(); notify('Data contoh ditambahkan. Kamu dapat mengedit atau menghapusnya.'); } catch (error) { notify(error.message); } });

async function loadWeather() {
  $('#refresh-weather').disabled = true; $('#weather').setAttribute('aria-busy', 'true'); $('#weather').innerHTML = '<p class="muted">Memuat cuaca kampus…</p>';
  try {
    const { temperature, windspeed, weathercode, time } = await app.fetchWeather();
    const description = weathercode === 0 ? 'Langit cerah' : weathercode <= 3 ? 'Berawan' : weathercode <= 48 ? 'Berkabut' : weathercode >= 95 ? 'Badai petir' : weathercode >= 71 && weathercode <= 86 ? 'Salju' : 'Hujan';
    $('#weather').innerHTML = `<div class="weather-reading"><strong>${Math.round(temperature)}<span>°C</span></strong><span class="weather-symbol" aria-hidden="true">${weathercode === 0 ? '☀' : '☁'}</span></div><p>${description} <span class="muted">· Angin ${windspeed} km/jam</span></p><small>Diperbarui ${safe(time.replace('T', ' '))} WIB</small>`;
  } catch (error) { $('#weather').innerHTML = `<p class="weather-error">${safe(error.message)}</p><button id="retry-weather" class="button secondary">Coba lagi</button>`; $('#retry-weather').addEventListener('click', loadWeather); }
  finally { $('#refresh-weather').disabled = false; $('#weather').setAttribute('aria-busy', 'false'); }
}
$('#refresh-weather').addEventListener('click', loadWeather);
$('#today').textContent = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(new Date());
render(); loadWeather();
if (app.loadError) notify(app.loadError);
