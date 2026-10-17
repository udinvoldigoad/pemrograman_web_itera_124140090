export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
export const todayKey = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export const formatDate = (date) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00+07:00`));
export const priorityLabel = (priority) => ({ high: 'Tinggi', medium: 'Sedang', low: 'Rendah' })[priority];
export const daysUntil = (deadline) => Math.round((Date.parse(`${deadline}T00:00:00+07:00`) - Date.parse(`${todayKey()}T00:00:00+07:00`)) / 86400000);
export const deadlineLabel = (deadline) => { const days = daysUntil(deadline); return days < 0 ? `Terlambat ${Math.abs(days)} hari` : days === 0 ? 'Hari ini' : days === 1 ? 'Besok' : `${days} hari lagi`; };
export const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T12:00:00Z`)) && new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date;
