"use strict";

// Kunci latihan terpisah dari localStorage aplikasi Mini POS.
const KEY_MAHASISWA = "modul-paw-pertemuan1-mahasiswa";
const KEY_TODO = "modul-paw-pertemuan1-todo";
const KEY_TEMA = "modul-paw-pertemuan1-tema";
const storageError = document.getElementById("storage-error");

// Latihan 2 dan 6: baca/tulis JSON dengan penanganan kegagalan storage.
function muatData(kunci, validasi) {
    try {
        const data = JSON.parse(localStorage.getItem(kunci) || "[]");
        if (!Array.isArray(data) || !validasi(data)) throw new Error("Format data tidak valid");
        return data;
    } catch {
        storageError.textContent = `Data tersimpan (${kunci}) tidak dapat dibaca. Daftar dimulai kosong.`;
        return [];
    }
}
function simpanData(kunci, data) {
    try {
        localStorage.setItem(kunci, JSON.stringify(data));
    } catch {
        storageError.textContent = "Penyimpanan browser gagal. Perubahan saat ini belum tersimpan untuk refresh.";
    }
}
let mahasiswa = muatData(KEY_MAHASISWA, data => data.every(item => item &&
    typeof item.nama === "string" && item.nama.trim().length >= 3 &&
    typeof item.nim === "string" && /^\d+$/.test(item.nim) &&
    typeof item.jurusan === "string" && item.jurusan.trim().length >= 3 &&
    Number.isFinite(item.nilai) && item.nilai >= 0 && item.nilai <= 100) &&
    new Set(data.map(item => item.nim)).size === data.length);

function tampilkanError(id, pesan) {
    document.getElementById(`error-${id}`).textContent = pesan;
    document.getElementById(id).setAttribute("aria-invalid", pesan ? "true" : "false");
}
function renderMahasiswa() {
    const tabel = document.getElementById("daftar-mahasiswa");
    tabel.replaceChildren();
    for (const item of mahasiswa) {
        const baris = document.createElement("tr");
        for (const nilai of [item.nama, item.nim, item.jurusan, item.nilai]) {
            const kolom = document.createElement("td");
            kolom.textContent = nilai;
            baris.append(kolom);
        }
        const aksi = document.createElement("td");
        const tombol = document.createElement("button");
        tombol.type = "button";
        tombol.textContent = "Hapus";
        tombol.setAttribute("aria-label", `Hapus ${item.nama}`);
        tombol.dataset.nim = item.nim;
        aksi.append(tombol);
        baris.append(aksi);
        tabel.append(baris);
    }
    if (mahasiswa.length === 0) {
        const baris = document.createElement("tr");
        const kolom = document.createElement("td");
        kolom.colSpan = 5;
        kolom.textContent = "Belum ada mahasiswa.";
        baris.append(kolom);
        tabel.append(baris);
    }
}

// Latihan 1: validasi tiap field sebelum menambahkan mahasiswa.
document.getElementById("form-mahasiswa").addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const nim = document.getElementById("nim").value.trim();
    const jurusan = document.getElementById("jurusan").value.trim();
    const nilaiTeks = document.getElementById("nilai").value;
    const nilai = Number(nilaiTeks);
    const error = {
        nama: nama.length < 3 ? "Nama wajib diisi, minimal 3 karakter." : "",
        nim: !/^\d+$/.test(nim) ? "NIM wajib diisi dengan angka." : mahasiswa.some(item => item.nim === nim) ? "NIM sudah digunakan." : "",
        jurusan: jurusan.length < 3 ? "Jurusan wajib diisi, minimal 3 karakter." : "",
        nilai: nilaiTeks === "" || !Number.isFinite(nilai) || nilai < 0 || nilai > 100 ? "Nilai wajib berupa angka 0-100." : ""
    };
    document.getElementById("status-mahasiswa").textContent = "";
    for (const [id, pesan] of Object.entries(error)) tampilkanError(id, pesan);
    if (Object.values(error).some(pesan => pesan !== "")) return;
    mahasiswa.push({ nama, nim, jurusan, nilai });
    simpanData(KEY_MAHASISWA, mahasiswa);
    renderMahasiswa();
    event.target.reset();
    document.getElementById("status-mahasiswa").textContent = `${nama} ditambahkan.`;
});
document.getElementById("daftar-mahasiswa").addEventListener("click", function (event) {
    const tombol = event.target.closest("button[data-nim]");
    if (!tombol) return;
    mahasiswa = mahasiswa.filter(item => item.nim !== tombol.dataset.nim);
    simpanData(KEY_MAHASISWA, mahasiswa);
    renderMahasiswa();
    document.getElementById("status-mahasiswa").textContent = "Mahasiswa dihapus.";
});
renderMahasiswa();

// Latihan 4: class CSS pada body menentukan tema.
const tombolTema = document.getElementById("toggle-tema");
function renderTema() {
    const dark = document.body.classList.contains("dark");
    tombolTema.setAttribute("aria-pressed", String(dark));
    tombolTema.textContent = dark ? "Aktifkan light mode" : "Aktifkan dark mode";
}
try {
    document.body.classList.toggle("dark", localStorage.getItem(KEY_TEMA) === "dark");
} catch {
    storageError.textContent = "Tema tersimpan tidak dapat dibaca.";
}
renderTema();
tombolTema.addEventListener("click", function () {
    const dark = document.body.classList.toggle("dark");
    try { localStorage.setItem(KEY_TEMA, dark ? "dark" : "light"); }
    catch { storageError.textContent = "Pilihan tema tidak dapat disimpan."; }
    renderTema();
});

// Latihan 3 dan 5: pencarian dilakukan sebelum membagi data ke halaman.
let semuaPost = [];
let halamanAktif = 1;
const PER_HALAMAN = 5;
const cariPost = document.getElementById("cari-post");
const statusApi = document.getElementById("status-api");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

function renderPost() {
    const kataKunci = cariPost.value.trim().toLowerCase();
    const hasil = semuaPost.filter(post => post.title.toLowerCase().includes(kataKunci));
    const totalHalaman = Math.ceil(hasil.length / PER_HALAMAN);
    halamanAktif = Math.max(1, Math.min(halamanAktif, totalHalaman));
    const awal = (halamanAktif - 1) * PER_HALAMAN;
    const daftar = document.getElementById("daftar-post");
    daftar.replaceChildren();
    for (const post of hasil.slice(awal, awal + PER_HALAMAN)) {
        const artikel = document.createElement("article");
        artikel.className = "post";
        const judul = document.createElement("h3");
        judul.textContent = post.title;
        const isi = document.createElement("p");
        isi.textContent = post.body;
        artikel.append(judul, isi);
        daftar.append(artikel);
    }
    statusApi.className = "result";
    statusApi.textContent = hasil.length ? `${hasil.length} post ditemukan.` : "Tidak ada post yang cocok.";
    document.getElementById("halaman").textContent = `Halaman ${totalHalaman ? halamanAktif : 0} dari ${totalHalaman}`;
    previous.disabled = halamanAktif <= 1;
    next.disabled = totalHalaman === 0 || halamanAktif >= totalHalaman;
}
document.getElementById("muat-post").addEventListener("click", async function (event) {
    const tombol = event.currentTarget;
    tombol.disabled = true;
    cariPost.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    statusApi.className = "result";
    statusApi.textContent = "Memuat post...";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data) || !data.every(post => post && typeof post.title === "string" && typeof post.body === "string")) {
            throw new Error("Format respons API tidak valid");
        }
        semuaPost = data;
        halamanAktif = 1;
        renderPost();
    } catch (error) {
        // Data lama tetap tersedia apabila pemuatan ulang gagal.
        renderPost();
        statusApi.className = "result error";
        statusApi.textContent = error.name === "AbortError" ? "Permintaan terlalu lama. Coba lagi." : `Gagal mengambil post: ${error.message}. Cek koneksi lalu coba lagi.`;
    } finally {
        clearTimeout(timeout);
        tombol.disabled = false;
        cariPost.disabled = semuaPost.length === 0;
    }
});
cariPost.addEventListener("input", function () { halamanAktif = 1; renderPost(); });
previous.addEventListener("click", function () { halamanAktif--; renderPost(); });
next.addEventListener("click", function () { halamanAktif++; renderPost(); });

// Latihan 6: tambah, hapus, tandai selesai, dan simpan Todo List.
let daftarTodo = muatData(KEY_TODO, data => data.every(item => item &&
    typeof item.id === "string" && item.id.length > 0 &&
    typeof item.teks === "string" && item.teks.trim().length > 0 &&
    typeof item.selesai === "boolean") && new Set(data.map(item => item.id)).size === data.length);
const listTodo = document.getElementById("daftar-todo");
const statusTodo = document.getElementById("status-todo");

function renderTodo() {
    listTodo.replaceChildren();
    for (const item of daftarTodo) {
        const baris = document.createElement("li");
        baris.className = item.selesai ? "selesai" : "";
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.selesai;
        checkbox.dataset.id = item.id;
        const teks = document.createElement("span");
        teks.textContent = item.teks;
        label.append(checkbox, teks);
        const hapus = document.createElement("button");
        hapus.type = "button";
        hapus.textContent = "Hapus";
        hapus.setAttribute("aria-label", `Hapus tugas ${item.teks}`);
        hapus.dataset.id = item.id;
        baris.append(label, hapus);
        listTodo.append(baris);
    }
    if (daftarTodo.length === 0) {
        const kosong = document.createElement("li");
        kosong.textContent = "Belum ada tugas.";
        listTodo.append(kosong);
    }
}
document.getElementById("form-todo").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("todo");
    const teks = input.value.trim();
    statusTodo.className = "result error";
    if (!teks) { statusTodo.textContent = "Tugas tidak boleh kosong."; return; }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    daftarTodo.push({ id, teks, selesai: false });
    simpanData(KEY_TODO, daftarTodo);
    renderTodo();
    event.target.reset();
    statusTodo.className = "result";
    statusTodo.textContent = "Tugas ditambahkan.";
});
listTodo.addEventListener("change", function (event) {
    const item = daftarTodo.find(todo => todo.id === event.target.dataset.id);
    if (!item) return;
    item.selesai = event.target.checked;
    simpanData(KEY_TODO, daftarTodo);
    renderTodo();
    statusTodo.className = "result";
    statusTodo.textContent = item.selesai ? "Tugas ditandai selesai." : "Tugas ditandai belum selesai.";
});
listTodo.addEventListener("click", function (event) {
    const tombol = event.target.closest("button[data-id]");
    if (!tombol) return;
    daftarTodo = daftarTodo.filter(item => item.id !== tombol.dataset.id);
    simpanData(KEY_TODO, daftarTodo);
    renderTodo();
    statusTodo.className = "result";
    statusTodo.textContent = "Tugas dihapus.";
});
renderTodo();
