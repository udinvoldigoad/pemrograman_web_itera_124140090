export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
export const capitalize = (text = '') => text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
export const fetchUser = async (id) => { await delay(150); if (id <= 0) throw new Error('ID user tidak valid'); return { id, name: `User ${id}`, email: `user${id}@example.com` }; };
export const fetchPosts = async (userId) => { await delay(100); return [{ id: 1, userId, title: 'Belajar ES6+' }, { id: 2, userId, title: 'Praktik async' }]; };
