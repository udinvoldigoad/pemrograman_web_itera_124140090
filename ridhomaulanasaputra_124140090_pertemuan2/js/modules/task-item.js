import { isValidDate, todayKey } from './utils.js';

export class TaskItem {
  constructor({ id = crypto.randomUUID(), title, course, deadline, priority = 'medium', notes = '', completed = false, createdAt = new Date().toISOString() } = {}) {
    if (typeof title !== 'string' || title.trim().length < 3 || title.trim().length > 120) throw new Error('Nama tugas harus berisi 3–120 karakter.');
    if (typeof course !== 'string' || !course.trim() || course.trim().length > 80) throw new Error('Mata kuliah wajib diisi, maksimal 80 karakter.');
    if (!isValidDate(deadline)) throw new Error('Pilih tanggal deadline yang valid.');
    if (!['high', 'medium', 'low'].includes(priority)) throw new Error('Prioritas tidak valid.');
    if (typeof notes !== 'string' || notes.length > 500) throw new Error('Catatan maksimal 500 karakter.');
    if (typeof id !== 'string' || !id || typeof completed !== 'boolean' || Number.isNaN(Date.parse(createdAt))) throw new Error('Data tugas tidak valid.');
    Object.assign(this, { id, title: title.trim(), course: course.trim(), deadline, priority, notes: notes.trim(), completed, createdAt });
  }
  get overdue() { return !this.completed && this.deadline < todayKey(); }
  withChanges(changes = {}) { return new TaskItem({ ...this, ...changes, id: this.id, createdAt: this.createdAt }); }
}
