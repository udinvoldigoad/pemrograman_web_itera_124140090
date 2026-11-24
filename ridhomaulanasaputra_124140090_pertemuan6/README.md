# Praktikum PAW — Pertemuan 6

## Identitas

- Nama: Ridho Maulana Saputra
- NIM: 124140090
- Kelas: RA
- Program Studi: Teknik Informatika, Institut Teknologi Sumatera

## Deskripsi

Aplikasi RESTful API untuk mengelola data mahasiswa dan matakuliah
menggunakan Pyramid, PostgreSQL, dan SQLAlchemy.
Perubahan struktur database dikelola menggunakan Alembic.

Fitur aplikasi:
- Menampilkan daftar dan detail mahasiswa serta matakuliah.
- Menambahkan, memperbarui, dan menghapus data.
- Validasi field wajib dan keunikan NIM atau kode matakuliah.
- Validasi SKS dan semester berupa integer lebih dari nol.
- Respons 400 untuk input tidak valid dan 404 untuk data tidak ditemukan.
- Seeding dua mahasiswa dan minimal tiga matakuliah.

## Instalasi

Persyaratan: Python 3.11 dan PostgreSQL yang sudah berjalan.

Dari folder pertemuan6, buat dan aktifkan virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Dari folder pertemuan6 dengan virtual environment aktif, pasang dependensi:

```powershell
python -m pip install -r requirements.txt
python -m pip install -e ".[testing]"
```

## Persiapan Database

Masuk sebagai administrator PostgreSQL:

```powershell
psql -h localhost -U postgres
```

Jalankan SQL berikut pada instalasi baru:

```sql
CREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;
```

Pindah database dan berikan izin skema:

```text
\c pyramid_mahasiswa
```

```sql
GRANT ALL ON SCHEMA public TO pyramid_user;
```

Keluar:

```text
\q
```

Konfigurasi koneksi di `development.ini`:

```ini
sqlalchemy.url = postgresql+psycopg2://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
```

Kredensial di atas merupakan contoh untuk lingkungan praktikum lokal.

## Migrasi dan Data Awal

Jalankan dari folder yang berisi `development.ini`:

```powershell
alembic -c development.ini upgrade head
initialize_pyramid_mahasiswa_db development.ini
```

File migrasi sudah disertakan di
`pyramid_mahasiswa/alembic/versions/`, sehingga instalasi baru cukup
menjalankan `upgrade head`.

## Menjalankan Aplikasi

```powershell
pserve development.ini --reload
```

Alamat API:

- http://localhost:6543/api/mahasiswa
- http://localhost:6543/api/matakuliah

## Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/mahasiswa` | Daftar mahasiswa |
| GET | `/api/mahasiswa/{id}` | Detail mahasiswa |
| POST | `/api/mahasiswa` | Tambah mahasiswa |
| PUT | `/api/mahasiswa/{id}` | Ubah mahasiswa |
| DELETE | `/api/mahasiswa/{id}` | Hapus mahasiswa |
| GET | `/api/matakuliah` | Daftar matakuliah |
| GET | `/api/matakuliah/{id}` | Detail matakuliah |
| POST | `/api/matakuliah` | Tambah matakuliah |
| PUT | `/api/matakuliah/{id}` | Ubah matakuliah |
| DELETE | `/api/matakuliah/{id}` | Hapus matakuliah |

POST dan PUT menggunakan body JSON dengan header
`Content-Type: application/json`.

Contoh body POST mahasiswa:

```json
{
  "nim": "999000001",
  "nama": "Mahasiswa Uji",
  "jurusan": "Teknik Informatika",
  "tanggal_lahir": "2005-01-15",
  "alamat": "Lampung"
}
```

Contoh body POST matakuliah:

```json
{
  "kode_mk": "IF9999",
  "nama_mk": "Matakuliah Uji",
  "sks": 3,
  "semester": 5
}
```

## Bukti Pengujian Mahasiswa

### GET Daftar — 200 OK
![Daftar mahasiswa](docs/screenshots/mahasiswa-get-list.png)

### GET Detail — 200 OK
![Detail mahasiswa](docs/screenshots/mahasiswa-get-detail.png)

### POST — 200 OK
![Tambah mahasiswa](docs/screenshots/mahasiswa-post.png)

### PUT — 200 OK
![Ubah mahasiswa](docs/screenshots/mahasiswa-put.png)

### DELETE — 200 OK
![Hapus mahasiswa](docs/screenshots/mahasiswa-delete.png)

### Field Wajib Tidak Diisi — 400 Bad Request
![Validasi NIM](docs/screenshots/mahasiswa-400.png)

### Data Tidak Ditemukan — 404 Not Found
![Mahasiswa tidak ditemukan](docs/screenshots/mahasiswa-404.png)

## Bukti Pengujian Matakuliah

### GET Daftar — 200 OK
![Daftar matakuliah](docs/screenshots/matakuliah-get-list.png)

### GET Detail — 200 OK
![Detail matakuliah](docs/screenshots/matakuliah-get-detail.png)

### POST — 200 OK
![Tambah matakuliah](docs/screenshots/matakuliah-post.png)

### PUT — 200 OK
![Ubah matakuliah](docs/screenshots/matakuliah-put.png)

### Kode Duplikat — 400 Bad Request
![Kode duplikat](docs/screenshots/matakuliah-duplikat.png)

### Field Wajib Tidak Lengkap — 400 Bad Request
![Field wajib](docs/screenshots/matakuliah-400.png)

### SKS Nol dan Semester Negatif — 400 Bad Request
![Validasi angka](docs/screenshots/matakuliah-sks-dan-semester-invalid.png)

### DELETE — 200 OK dan GET Setelah Dihapus — 404 Not Found
![Hapus dan cek kembali](docs/screenshots/matakuliah-delete-dan-404.png)