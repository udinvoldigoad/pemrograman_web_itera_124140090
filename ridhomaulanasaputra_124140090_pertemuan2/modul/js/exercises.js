import { sampleUsers, sampleProducts } from './modules/data.js';
import { delay, fetchUser, fetchPosts } from './modules/utils.js';

// 1–4: latihan Let/Const, Arrow, dan Template Literals.
const constError = () => { const value = 3; try { value = 4; } catch (error) { return { caught: error.name, message: error.message, value }; } };
const blockScope = () => { var old = 'luar'; let modern = 'luar'; { var old = 'dalam'; let modern = 'dalam'; console.log(modern); } return { varOutside: old, letOutside: modern }; };
const arrowVariants = () => { const hello = () => 'Halo'; const double = x => x * 2; const add = (a, b) => a + b; const object = name => ({ name }); return { zero: hello(), one: double(4), two: add(5, 3), object: object('Ridho') }; };
const htmlTemplate = () => { const { name, age } = sampleUsers[0]; return `<article>\n  <h2>${name}</h2>\n  <p>Usia ${age} tahun</p>\n</article>`; };

// 5–8: Destructuring, Spread, Rest.
const deepDestructuring = () => { const student = { university: { faculty: { program: { name: 'Teknik Informatika' } } } }; const { university: { faculty: { program: { name } } } } = student; return { name }; };
export const statistics = (...numbers) => { if (!numbers.length || numbers.some(n => !Number.isFinite(n))) throw new Error('Masukkan minimal satu angka valid.'); return { min: Math.min(...numbers), max: Math.max(...numbers), average: numbers.reduce((sum, n) => sum + n, 0) / numbers.length }; };
const mergeObjects = () => { const identity = { name: 'Ridho', role: 'guest' }; const academic = { program: 'Informatika', role: 'student' }; const preferences = { theme: 'green', role: 'practitioner' }; return { ...identity, ...academic, ...preferences, theme: 'light' }; };
const destructuringLoop = () => { const output = []; for (const { name, age } of sampleUsers) output.push(`${name}: ${age} tahun`); return output; };

// 9–12: Classes & Object Literals.
export class Product {
  constructor(name, price = 0) { this.name = name; this.price = price; }
  get price() { return this._price; }
  set price(value) { if (!Number.isFinite(value) || value < 0) throw new Error('Harga harus angka nonnegatif.'); this._price = value; }
  getInfo() { return `${this.name}: Rp${this.price.toLocaleString('id-ID')}`; }
}
export class DigitalProduct extends Product { constructor(name, price, downloadUrl) { super(name, price); this.downloadUrl = downloadUrl; } getInfo() { return `${super.getInfo()} (digital)`; } }
export class PhysicalProduct extends Product { constructor(name, price, weight) { super(name, price); this.weight = weight; } getInfo() { return `${super.getInfo()} (${this.weight} kg)`; } }
const inheritance = () => ({ digital: new DigitalProduct('E-book', 50000, '/ebook.pdf').getInfo(), physical: new PhysicalProduct('Buku', 75000, .3).getInfo(), instance: new DigitalProduct('Modul', 0, '/modul.pdf') instanceof Product });
const getterSetter = () => { const product = new Product('Buku', 25000); const before = product.price; product.price = 30000; let error; try { product.price = -1; } catch (caught) { error = caught.message; } return { before, after: product.price, error }; };
const computedKeys = () => { const prefix = 'student'; const id = 124140090; return { [`${prefix}_id`]: id, [`${prefix}_name`]: 'Ridho', [`course_${2}`]: 'PAW' }; };
const defaultsWithDestructuring = () => { const makeProfile = ({ name = 'Guest', role = 'student', active = true } = {}) => ({ name, role, active }); return { empty: makeProfile(), custom: makeProfile({ name: 'Ridho', active: false }) }; };

// 13–16: Modern Array Methods.
export const groupBy = (items, key) => items.reduce((groups, item) => { const group = item[key]; return { ...groups, [group]: [...(groups[group] || []), item] }; }, {});
const averageObjects = () => ({ averageAge: sampleUsers.reduce((sum, { age }) => sum + age, 0) / sampleUsers.length });
const flattenStructure = () => { const semesters = [{ semester: 1, courses: [{ name: 'PAW', credits: 3 }, { name: 'Basis Data', credits: 3 }] }, { semester: 2, courses: [{ name: 'Jaringan', credits: 3 }] }]; return semesters.flatMap(({ semester, courses }) => courses.map(course => ({ ...course, semester }))); };
const complexAnalysis = () => ({ activeNames: sampleUsers.filter(({ active }) => active).map(({ name }) => name), techTotal: sampleProducts.filter(({ category }) => category === 'tech').map(({ price }) => price).reduce((total, price) => total + price, 0) });

// 17–22: Async Programming. Endpoint disimulasikan secara deterministik.
const multipleEndpoints = async () => { const [user, posts] = await Promise.all([fetchUser(1), fetchPosts(1)]); return { user, posts }; };
export async function retry(operation, maxAttempts = 3, baseDelay = 30) { for (let attempt = 1; attempt <= maxAttempts; attempt++) { try { return await operation(attempt); } catch (error) { if (attempt === maxAttempts) throw error; await delay(baseDelay * 2 ** (attempt - 1)); } } }
const exponentialRetry = async () => { let attempts = 0; const result = await retry(async () => { attempts++; if (attempts < 3) throw new Error('Simulasi jaringan gagal'); return 'Berhasil pada percobaan ketiga'; }); return { attempts, delays: [30, 60], result }; };
const loadingStates = async () => { const states = ['idle', 'loading']; try { const user = await fetchUser(1); states.push('success'); return { states, user }; } catch (error) { states.push('error'); return { states, error: error.message }; } finally { console.log('Loading selesai'); } };
const errorBoundary = async () => { try { await fetchUser(-1); return { status: 'success' }; } catch (error) { return { status: 'error', message: error.message, fallback: 'Data tidak tersedia. Coba lagi.' }; } };
export const fetchPage = async (page = 1, size = 3) => { await delay(70); const items = Array.from({ length: 8 }, (_, index) => ({ id: index + 1, title: `Tugas ${index + 1}` })); return { page, totalPages: Math.ceil(items.length / size), items: items.slice((page - 1) * size, page * size) }; };
const pagination = async () => ({ first: await fetchPage(1), second: await fetchPage(2), last: await fetchPage(3) });
export const debounce = (operation, wait = 50) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => operation(...args), wait); }; };
const debouncedSearch = async () => { const requests = []; const results = []; const search = debounce(async term => { requests.push(term); await delay(20); results.push(sampleUsers.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase()))); }, 50); search('J'); search('Jo'); search('John'); await delay(150); return { inputSequence: ['J', 'Jo', 'John'], actualRequests: requests, results }; };
export const exercises = [
 ['Const reassignment', constError], ['Scope var vs let', blockScope], ['Variasi arrow function', arrowVariants], ['HTML dengan template literal', htmlTemplate],
 ['Nested destructuring ≥ 3 level', deepDestructuring], ['Statistik dengan rest parameter', () => statistics(10, 20, 30, 40)], ['Merge 3 objek dan override', mergeObjects], ['Destructuring pada for…of', destructuringLoop],
 ['Product dan inheritance', inheritance], ['Getter dan setter tervalidasi', getterSetter], ['Computed property names', computedKeys], ['Default + destructuring parameter', defaultsWithDestructuring],
 ['groupBy dengan reduce', () => groupBy(sampleUsers, 'role')], ['Rata-rata array of objects', averageObjects], ['Flatten struktur bersarang', flattenStructure], ['Analisis filter/map/reduce', complexAnalysis],
 ['Gabungkan beberapa endpoint', multipleEndpoints], ['Retry exponential backoff', exponentialRetry], ['Loading states async', loadingStates], ['Error boundary async', errorBoundary], ['Pagination async', pagination], ['Debounced async search', debouncedSearch]
];
