"use strict";

// Latihan 1: array berisi lima objek, masing-masing punya empat properti.
let mahasiswa = [
    { nama: "Udin Mikrotik", nim: "124140090", jurusan: "Teknik Informatika", nilai: 100 },
    { nama: "Ridho Hengkertzy", nim: "124140091", jurusan: "Teknik Informatika", nilai: 92 },
    { nama: "Ucok Jaringan", nim: "124140092", jurusan: "Ilmu Padi", nilai: 99 },
    { nama: "Asep Ubuntu", nim: "124140093", jurusan: "Teknik Informatika", nilai: 90 },
    { nama: "Aceng Laravel", nim: "124140094", jurusan: "Sistem Informasi", nilai: 88 }
];
let nimDiedit = null;
const form = document.getElementById("form-mahasiswa");
const tabel = document.getElementById("daftar-mahasiswa");
const pesan = document.getElementById("pesan");

// Latihan 2: reduce menyimpan objek dengan nilai paling tinggi.
function cariNilaiTertinggi(data) {
    return data.reduce((terbaik, item) => !terbaik || item.nilai > terbaik.nilai ? item : terbaik, null);
}

// Latihan 3: reduce untuk rata-rata, filter untuk memilih mahasiswa.
function hitungRataRata(data) {
    if (data.length === 0) return 0;
    return data.reduce((total, item) => total + item.nilai, 0) / data.length;
}
function mahasiswaDiAtasRataRata(data) {
    const rataRata = hitungRataRata(data);
    return data.filter(item => item.nilai > rataRata);
}

// Latihan 4: salin array sebelum sort agar urutan data asli tetap tersedia.
function urutkanMahasiswa(data, urutan) {
    const arah = urutan === "desc" ? -1 : 1;
    return [...data].sort((a, b) => arah * a.nama.localeCompare(b.nama, "id"));
}

function renderMahasiswa() {
    const terbaik = cariNilaiTertinggi(mahasiswa);
    document.getElementById("tertinggi").textContent = terbaik ? `${terbaik.nama}: ${terbaik.nilai}` : "Belum ada mahasiswa.";
    document.getElementById("rata-rata").textContent = `Rata-rata seluruh mahasiswa: ${hitungRataRata(mahasiswa).toFixed(2)}`;
    const hasilFilter = document.getElementById("filter").value === "di-atas-rata" ? mahasiswaDiAtasRataRata(mahasiswa) : mahasiswa;
    const data = urutkanMahasiswa(hasilFilter, document.getElementById("urutan").value);
    document.getElementById("jumlah").textContent = `${data.length} dari ${mahasiswa.length} mahasiswa ditampilkan.`;
    tabel.replaceChildren();
    for (const item of data) {
        const baris = document.createElement("tr");
        for (const nilai of [item.nama, item.nim, item.jurusan, item.nilai]) {
            const kolom = document.createElement("td");
            kolom.textContent = nilai;
            baris.append(kolom);
        }
        const aksi = document.createElement("td");
        for (const jenis of ["edit", "hapus"]) {
            const tombol = document.createElement("button");
            tombol.type = "button";
            tombol.textContent = jenis === "edit" ? "Edit" : "Hapus";
            tombol.setAttribute("aria-label", `${tombol.textContent} ${item.nama}`);
            tombol.dataset.aksi = jenis;
            tombol.dataset.nim = item.nim;
            aksi.append(tombol);
        }
        baris.append(aksi);
        tabel.append(baris);
    }
    if (data.length === 0) {
        const baris = document.createElement("tr");
        const kolom = document.createElement("td");
        kolom.colSpan = 5;
        kolom.textContent = "Tidak ada mahasiswa untuk ditampilkan.";
        baris.append(kolom);
        tabel.append(baris);
    }
}

function selesaiEdit() {
    nimDiedit = null;
    form.reset();
    document.getElementById("simpan").textContent = "Tambah mahasiswa";
    document.getElementById("batal").hidden = true;
}

// Latihan 5: Create dan Update memakai form yang sama.
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const nim = document.getElementById("nim").value.trim();
    const jurusan = document.getElementById("jurusan").value.trim();
    const nilaiTeks = document.getElementById("nilai").value;
    const nilai = Number(nilaiTeks);
    pesan.className = "result error";
    if (nama.length < 3 || !/^\d+$/.test(nim) || jurusan.length < 3) {
        pesan.textContent = "Nama dan jurusan minimal 3 karakter. NIM wajib diisi dengan angka.";
        return;
    }
    if (nilaiTeks === "" || !Number.isFinite(nilai) || nilai < 0 || nilai > 100) {
        pesan.textContent = "Nilai wajib berupa angka 0-100.";
        return;
    }
    if (mahasiswa.some(item => item.nim === nim && item.nim !== nimDiedit)) {
        pesan.textContent = "NIM sudah digunakan mahasiswa lain.";
        return;
    }
    const data = { nama, nim, jurusan, nilai };
    if (nimDiedit === null) mahasiswa.push(data);
    else mahasiswa[mahasiswa.findIndex(item => item.nim === nimDiedit)] = data;
    pesan.className = "result";
    pesan.textContent = nimDiedit === null ? "Mahasiswa ditambahkan." : "Data mahasiswa diperbarui.";
    selesaiEdit();
    renderMahasiswa();
});

// Read dilakukan renderMahasiswa; tombol tabel menangani Edit dan Delete.
tabel.addEventListener("click", function (event) {
    const tombol = event.target.closest("button[data-aksi]");
    if (!tombol) return;
    const item = mahasiswa.find(data => data.nim === tombol.dataset.nim);
    if (!item) return;
    if (tombol.dataset.aksi === "edit") {
        nimDiedit = item.nim;
        for (const properti of ["nama", "nim", "jurusan", "nilai"]) document.getElementById(properti).value = item[properti];
        document.getElementById("simpan").textContent = "Simpan perubahan";
        document.getElementById("batal").hidden = false;
        pesan.className = "result";
        pesan.textContent = `Mengedit ${item.nama}.`;
        document.getElementById("nama").focus();
    } else {
        mahasiswa = mahasiswa.filter(data => data.nim !== item.nim);
        if (nimDiedit === item.nim) selesaiEdit();
        pesan.className = "result";
        pesan.textContent = `${item.nama} dihapus.`;
        renderMahasiswa();
    }
});
document.getElementById("batal").addEventListener("click", function () { selesaiEdit(); pesan.textContent = "Edit dibatalkan."; });
document.getElementById("filter").addEventListener("change", renderMahasiswa);
document.getElementById("urutan").addEventListener("change", renderMahasiswa);
renderMahasiswa();
