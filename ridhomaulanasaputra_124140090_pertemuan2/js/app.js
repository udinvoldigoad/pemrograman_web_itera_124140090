import { TaskItem } from './modules/task-item.js';
import { STORAGE_KEY, WEATHER_URL } from './modules/data.js';

export class DashboardApp {
  constructor(storage = localStorage) { this.storage = storage; this.tasks = []; this.loadError = ''; this.load(); }
  load() {
    try {
      const saved = this.storage.getItem(STORAGE_KEY);
      if (saved === null) return;
      const data = JSON.parse(saved);
      if (!Array.isArray(data)) throw new Error('Format data penyimpanan tidak valid.');
      const tasks = data.map(item => new TaskItem(item));
      if (new Set(tasks.map(({ id }) => id)).size !== tasks.length) throw new Error('ID tugas duplikat.');
      this.tasks = tasks;
    } catch { this.loadError = 'Data lokal tidak dapat dibaca. Data lama tetap disimpan; periksa penyimpanan browser sebelum menyimpan tugas baru.'; }
  }
  commit(tasks) {
    if (this.loadError) throw new Error(this.loadError);
    try { this.storage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
    catch { throw new Error('Tugas belum tersimpan. Penyimpanan browser penuh atau tidak diizinkan.'); }
    this.tasks = tasks;
  }
  add(data) { const task = new TaskItem(data); this.commit([...this.tasks, task]); return task; }
  update(id, changes) { if (!this.tasks.some(task => task.id === id)) throw new Error('Tugas tidak ditemukan.'); this.commit(this.tasks.map(task => task.id === id ? task.withChanges(changes) : task)); }
  remove(id) { this.commit(this.tasks.filter(task => task.id !== id)); }
  seed(items) { if (this.tasks.length) throw new Error('Data contoh hanya dapat digunakan pada daftar kosong.'); this.commit(items.map(item => new TaskItem(item))); }
  get summary() { return this.tasks.reduce((summary, task) => ({ total: summary.total + 1, done: summary.done + Number(task.completed), pending: summary.pending + Number(!task.completed), overdue: summary.overdue + Number(task.overdue) }), { total: 0, done: 0, pending: 0, overdue: 0 }); }
  select({ query = '', status = 'all', sort = 'deadline' } = {}) {
    const term = query.trim().toLocaleLowerCase('id');
    const weights = { high: 0, medium: 1, low: 2 };
    return this.tasks.filter(({ title, course, completed }) => `${title} ${course}`.toLocaleLowerCase('id').includes(term) && (status === 'all' || (status === 'done' ? completed : !completed)))
      .sort((a, b) => sort === 'priority' ? weights[a.priority] - weights[b.priority] || a.deadline.localeCompare(b.deadline) : sort === 'newest' ? b.createdAt.localeCompare(a.createdAt) : Number(a.completed) - Number(b.completed) || a.deadline.localeCompare(b.deadline));
  }
  async fetchWeather(fetcher = fetch) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetcher(WEATHER_URL, { signal: controller.signal });
      if (!response.ok) throw new Error('Layanan cuaca sedang tidak tersedia.');
      const { current_weather: weather } = await response.json();
      if (!weather || !Number.isFinite(weather.temperature) || !Number.isFinite(weather.windspeed) || !Number.isFinite(weather.weathercode) || typeof weather.time !== 'string') throw new Error('Data cuaca tidak lengkap.');
      return weather;
    } catch (error) { throw new Error(error.name === 'AbortError' ? 'Permintaan cuaca terlalu lama. Coba lagi.' : 'Cuaca belum dapat dimuat. Periksa koneksi lalu coba lagi.'); }
    finally { clearTimeout(timeout); }
  }
}
