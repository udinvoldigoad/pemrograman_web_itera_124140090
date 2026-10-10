# Latihan Modul Pertemuan 1 - JavaScript Dasar

Nama: Ridho Maulana Saputra  
NIM: 124140090  
Kelas: RA

Folder ini berisi solusi 21 latihan pada empat bagian materi PDF **Pertemuan 1: JavaScript Dasar | Modul PAW ITERA**. Setiap materi memiliki halaman HTML dan file JavaScript sendiri. CSS digunakan bersama agar tidak ada duplikasi styling.

## Struktur folder

```text
modul/
├── index.html                     # Menu semua materi
├── style.css                      # CSS bersama, termasuk dark mode
├── README.md                      # Panduan dan pemetaan latihan
├── 01-variabel-kondisional/
│   ├── index.html
│   └── script.js
├── 02-loop-fungsi/
│   ├── index.html
│   └── script.js
├── 03-array-objek/
│   ├── index.html
│   └── script.js
└── 04-dom-api/
    ├── index.html
    └── script.js
```

## Menjalankan

1. Buka folder proyek di VS Code.
2. Klik kanan `modul/index.html`, lalu pilih **Open with Live Server**.
3. Pilih materi di halaman menu. Isi input dan gunakan tombol untuk mencoba latihan.
4. Untuk materi DOM & API, gunakan **Ambil post dari API** saat terhubung internet.
5. Data mahasiswa, Todo List, dan tema pada materi DOM & API bisa diuji dengan refresh pada alamat dan port yang sama.

## Daftar latihan

### 01. Variabel & Kondisional (5 latihan)

| Latihan dari modul | Implementasi |
| --- | --- |
| Data diri menggunakan const dan let | `const nama`, `let umur`, `let kotaAsal`, ditampilkan di halaman dan console |
| Kelulusan dengan nilai >= 70 | Form nilai dan if-else |
| Kategori umur | Anak <12, remaja 12-17, dewasa 18-59, lansia >=60 |
| Konversi angka hari 1-7 ke bahasa Inggris | Fungsi `namaHari()` dengan switch-case; 1 = Monday, 7 = Sunday |
| Kalkulator grade menggunakan ternary | Fungsi `hitungGrade()`; A >=90, B >=80, C >=70, D >=60, E <60 |

### 02. Loop & Fungsi (5 latihan)

| Latihan dari modul | Implementasi |
| --- | --- |
| Tabel perkalian 1-10 | for loop dan pembuatan baris tabel DOM |
| Fungsi faktorial | `faktorial()`; 0! = 1, input 0-18 agar hasil integer presisi dengan Number |
| Pemeriksaan bilangan prima | `apakahPrima()`; periksa pembagi sampai akar kuadrat; input maksimal 1 miliar |
| Kalkulator BMI dengan fungsi dan event handler | `hitungBmi()`; berat kg / kuadrat tinggi meter; form menerima tinggi cm |
| FizzBuzz 1-100 | for loop, modulo, if-else; hasil di halaman dan console |


### 03. Array & Objek (5 latihan)

| Latihan dari modul | Implementasi |
| --- | --- |
| Minimal 5 objek mahasiswa dalam tabel HTML | Lima data contoh dengan nama, nim, jurusan, nilai |
| Mencari nilai tertinggi menggunakan method array | `cariNilaiTertinggi()` menggunakan reduce() |
| Filter nilai di atas rata-rata | `hitungRataRata()` dengan reduce(), `mahasiswaDiAtasRataRata()` dengan filter() |
| Mengurutkan nama ascending/descending | `urutkanMahasiswa()` dengan salinan array, sort(), dan localeCompare() |
| CRUD dengan event handler | Form tambah/edit, tabel Read, tombol Hapus, dan Batal edit |

### 04. DOM & API (6 latihan)

| Latihan dari modul | Implementasi |
| --- | --- |
| Form mahasiswa dengan validasi | Pesan per field, aria-invalid, pemeriksaan NIM unik, dan reset setelah berhasil |
| Penyimpanan mahasiswa persisten | JSON.stringify(), JSON.parse(), dan localStorage |
| Search/filter post berdasarkan title | filter() dengan pencarian tanpa membedakan huruf besar/kecil |
| Dark mode menggunakan class CSS | classList.toggle("dark") dan pilihan tema persisten |
| Pagination Previous/Next | 5 post per halaman; batas tombol; pencarian mengembalikan halaman ke 1 |
| Todo List dengan localStorage | Tambah, hapus, checkbox selesai, manipulasi DOM, dan penyimpanan JSON |

Kunci localStorage khusus latihan:

- `modul-paw-pertemuan1-mahasiswa`
- `modul-paw-pertemuan1-todo`
- `modul-paw-pertemuan1-tema`

Kunci tersebut terpisah dari keranjang Mini POS. Data tersimpan diperiksa sebelum dipakai. Bila penyimpanan browser gagal, aplikasi menampilkan peringatan dan masih bisa digunakan selama halaman terbuka. Input pengguna dan isi API ditampilkan melalui `textContent`.

## Contoh pengecekan

- Nilai 69 tidak lulus, nilai 70 lulus; grade 90 = A, 80 = B, 70 = C, 60 = D, 59 = E.
- Umur 11 = Anak, 12 = Remaja, 18 = Dewasa, 60 = Lansia.
- Perkalian angka 7 menghasilkan 10 baris, terakhir 7 × 10 = 70.
- 0! = 1 dan 5! = 120; 1 bukan prima, 2 dan 17 prima, 25 bukan prima.
- Berat 60 kg dan tinggi 170 cm menghasilkan BMI 20.76.
- FizzBuzz memiliki 100 hasil; posisi 3 = Fizz, 5 = Buzz, 15 = FizzBuzz.
- Data awal mahasiswa: rata-rata 86.60, tertinggi Citra Lestari (92), filter di atas rata-rata menampilkan 3 mahasiswa.
- Tambah, edit, hapus mahasiswa; coba NIM duplikat dan nilai kosong.
- Pada DOM & API, tambah mahasiswa dan Todo, tandai Todo selesai, lalu refresh untuk memeriksa penyimpanan.
- Ambil post, gunakan Next/Previous, lalu cari judul. Pencarian yang tidak cocok menghasilkan halaman 0 dari 0 dan tombol navigasi nonaktif.
