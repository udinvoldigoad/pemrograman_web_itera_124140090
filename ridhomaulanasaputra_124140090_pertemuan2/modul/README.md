# Lab JavaScript Next Gen (ES6+)

Ridho Maulana Saputra · 124140090 · Kelas RA

Buka `modul/index.html` melalui Live Server. Setiap kartu memiliki tombol **Jalankan**. Tombol **Jalankan semua demo**, **Jalankan semua latihan**, dan **Bersihkan output** mengelola hasil eksekusi. Output ditampilkan sebagai teks agar contoh HTML tidak dieksekusi sebagai markup.

## Materi dan demo

`js/demos.js` memuat 12 demo: Let/Const, Arrow Functions, Template Literals, Destructuring, Spread/Rest, Default Parameters, Classes, Enhanced Object Literals, Modern Array Methods, Advanced Arrays, Promises, dan Async/Await. `js/main.js` menjadi pengendali DOM; data dan utilitas dipisahkan dalam `js/modules/`.

Penggunaan `var` sengaja dibatasi pada demo perbandingan scope lama. Error reassignment `const` ditangkap sebagai hasil latihan, sehingga tidak menghentikan aplikasi.

## Solusi 22 latihan

Seluruh solusi terdapat di `js/exercises.js` dan dapat dijalankan dari kartu yang sesuai.

| No. | Materi | Latihan dan hasil yang diperiksa |
| --- | --- | --- |
| 1 | Let/Const | Reassign const menghasilkan `TypeError` yang ditangkap |
| 2 | Let/Const | `var` berubah di luar blok; `let` di luar tetap |
| 3 | Arrow | Tanpa parameter, satu parameter, banyak parameter, return objek |
| 4 | Template | String HTML multi-baris dengan interpolasi |
| 5 | Destructuring | Ekstraksi nama program dari objek minimal tiga level |
| 6 | Rest | Statistik 10,20,30,40: min 10, max 40, average 25 |
| 7 | Spread | Gabung tiga objek; properti paling akhir mengoverride sebelumnya |
| 8 | Destructuring | Ekstraksi nama/usia pada loop `for…of` |
| 9 | Classes | `DigitalProduct` dan `PhysicalProduct` mewarisi `Product` |
| 10 | Classes | Getter/setter harga; nilai negatif ditolak |
| 11 | Objects | Nama properti dinamis dengan computed property names |
| 12 | Defaults | Parameter objek dengan destructuring/default; false tetap dipertahankan |
| 13 | Arrays | `groupBy` menggunakan `reduce` |
| 14 | Arrays | Rata-rata usia array objek: 26,25 |
| 15 | Arrays | Semester/kuliah bersarang menjadi array flat |
| 16 | Arrays | Gabungkan filter/map/reduce; total produk tech Rp15.850.000 |
| 17 | Async | Gabungkan hasil beberapa endpoint simulasi dengan `Promise.all` |
| 18 | Async | Retry berhasil di percobaan ketiga, jeda 30 dan 60 ms |
| 19 | Async | Status idle → loading → success |
| 20 | Async | Tangkap error ID invalid dan tampilkan fallback |
| 21 | Async | Pagination: 8 item dalam 3 halaman berukuran 3 |
| 22 | Async | Input J → Jo → John menghasilkan satu request akhir |

API pada Lab merupakan simulasi deterministik menggunakan Promise/timer, sehingga latihan tetap berjalan tanpa internet. Widget dashboard menggunakan Open-Meteo nyata. Lab tidak menulis data ke localStorage dan tidak mengubah tugas dashboard.

## Memeriksa

1. Klik **Jalankan semua demo**; semua 12 kartu berstatus Selesai.
2. Klik **Jalankan semua latihan**; semua 22 kartu berstatus Selesai.
3. Periksa keluaran latihan async: retry, fallback error, pagination, dan debounce.
4. Klik **Bersihkan output**, kemudian jalankan satu kartu kembali.

Pengujian otomatis tersedia di `../tests/app.test.mjs`.
