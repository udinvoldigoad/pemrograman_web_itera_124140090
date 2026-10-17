import { sampleUsers, sampleProducts } from './modules/data.js';
import { delay, fetchUser, fetchPosts } from './modules/utils.js';

export function demoVariables() {
  // var dipakai hanya untuk membandingkan sintaks lama dalam latihan.
  var oldVar = 'Nilai awal'; { var oldVar = 'Berubah di dalam blok'; }
  let newLet = 'Nilai luar'; { let newLet = 'Nilai dalam'; console.log(newLet); }
  const PI = 3.14159; const user = { name: 'Ridho', age: 20 }; user.age = 21;
  return { oldVar, newLet, PI, user };
}
export const demoArrowFunctions = () => {
  function regularSum(a, b) { return a + b; }
  const sum = (a, b) => a + b; const square = x => x * x; const hello = () => 'Halo!'; const createUser = (name, age) => ({ name, age });
  return { regular: regularSum(5, 3), arrow: sum(5, 3), square: square(4), greeting: hello(), object: createUser('Ridho', 20) };
};
export const demoTemplateLiterals = () => { const name = 'Ridho'; const age = 20; return { oldWay: 'Nama saya ' + name + ', umur ' + age, newWay: `Nama saya ${name}, umur ${age}`, multiLine: `Nama: ${name}\nUmur: ${age}`, expression: `5 + 3 = ${5 + 3}`, html: `<article><h2>${name}</h2><p>${age} tahun</p></article>` }; };
export const demoDestructuring = () => { const person = { firstName: 'Ridho', address: { city: 'Lampung' } }; const { firstName: name, hobby = 'coding', address: { city } } = person; const [first, , third, ...rest] = ['merah', 'hijau', 'biru', 'kuning']; let a = 1; let b = 2; [a, b] = [b, a]; return { name, hobby, city, first, third, rest, swapped: [a, b] }; };
export const demoSpreadRest = () => { const numbers = [1, 2, 3]; const user = { name: 'Ridho', age: 20 }; const sum = (...values) => values.reduce((total, number) => total + number, 0); return { copy: [...numbers], merged: [...numbers, 4, 5], object: { ...user, age: 21, role: 'student' }, restSum: sum(1, 2, 3, 4, 5) }; };
export const demoDefaultParams = () => { const greet = (name = 'Guest', greeting = 'Halo') => `${greeting}, ${name}!`; const order = (price, quantity = 1, total = price * quantity) => ({ price, quantity, total }); return { default: greet(), custom: greet('Ridho', 'Selamat pagi'), validEmptyString: greet(''), order: order(10000, 2) }; };
export class User { constructor(name, email) { this.name = name; this.email = email; } getInfo() { return `${this.name} (${this.email})`; } }
export class Admin extends User { constructor(name, email, role = 'admin') { super(name, email); this.role = role; } getInfo() { return `${super.getInfo()} — ${this.role}`; } hasAccess() { return true; } }
export const demoClasses = () => { const user = new User('Ridho', 'ridho@example.com'); const admin = new Admin('Admin', 'admin@example.com'); return { user: user.getInfo(), admin: admin.getInfo(), hasAccess: admin.hasAccess(), inheritance: admin instanceof User }; };
export const demoObjectLiterals = () => { const name = 'Ridho'; const age = 20; const prefix = 'skill'; const person = { name, age, sayHello() { return `Halo, ${this.name}`; }, [`${prefix}_1`]: 'JavaScript' }; return { person, greeting: person.sayHello() }; };
export const demoArrayMethods = () => ({ map: sampleUsers.map(({ name }) => name), filter: sampleUsers.filter(({ active }) => active), find: sampleUsers.find(({ id }) => id === 2), some: sampleUsers.some(({ age }) => age > 30), every: sampleUsers.every(({ age }) => age >= 18), reduce: sampleProducts.reduce((total, { price }) => total + price, 0), chaining: sampleUsers.filter(({ active }) => active).map(({ name }) => name) });
export const demoAdvancedArrays = () => ({ from: Array.from('hello'), squares: Array.from([1, 2, 3], n => n * n), of: Array.of(1, 'dua', { three: 3 }), flat: [1, [2, [3]]].flat(2), flatMap: [1, 2, 3].flatMap(n => [n, n * 2]), includes: [1, 2, 3].includes(3), clone: [...sampleProducts] });
export const demoPromises = () => fetchUser(1).then(user => fetchPosts(user.id).then(posts => ({ user, posts }))).then(async basic => ({ basic, all: await Promise.all([fetchUser(2), fetchUser(3)]), race: await Promise.race([delay(50).then(() => 'Operasi cepat'), delay(200).then(() => 'Operasi lambat')]), settled: await Promise.allSettled([fetchUser(1), fetchUser(-1)]).then(results => results.map(({ status, value, reason }) => ({ status, value, error: reason?.message }))) }));
export async function demoAsyncAwait() { try { const user = await fetchUser(42); const posts = await fetchPosts(user.id); const users = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]); let handledError; try { await fetchUser(-1); } catch (error) { handledError = error.message; } return { user, posts, parallelUsers: users, handledError }; } catch (error) { return { error: error.message }; } }
export const demos = [
  ['Let & Const', 'Scope blok, referensi const, dan perbandingan var.', demoVariables],
  ['Arrow Functions', 'Implicit return, satu parameter, dan objek literal.', demoArrowFunctions],
  ['Template Literals', 'Interpolasi, ekspresi, string multi-baris, dan HTML.', demoTemplateLiterals],
  ['Destructuring', 'Rename, default, nested, skip, rest, dan swap.', demoDestructuring],
  ['Spread & Rest', 'Salin data, gabungkan array, dan argumen fleksibel.', demoSpreadRest],
  ['Default Parameters', 'Nilai bawaan dan parameter berbasis ekspresi.', demoDefaultParams],
  ['Classes', 'Constructor, methods, extends, super, dan instanceof.', demoClasses],
  ['Enhanced Object Literals', 'Property shorthand, method, dan computed key.', demoObjectLiterals],
  ['Modern Array Methods', 'map, filter, find, reduce, some, every, chaining.', demoArrayMethods],
  ['Advanced Arrays', 'Array.from, Array.of, flat, flatMap, includes.', demoAdvancedArrays],
  ['Promises', 'Chaining, all, race, dan allSettled.', demoPromises],
  ['Async/Await', 'Urutan operasi, eksekusi paralel, dan try/catch.', demoAsyncAwait]
];
