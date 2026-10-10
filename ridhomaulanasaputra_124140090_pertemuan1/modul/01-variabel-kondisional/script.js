"use strict";

// Latihan 1: const untuk nama, let untuk data yang bisa diperbarui.
const nama = "Ridho Maulana Saputra";
let umur = 21; 
let kotaAsal = "Lampung Tengah";
document.getElementById("data-diri").textContent = `${nama}, ${umur} tahun, asal ${kotaAsal}.`;
console.log({ nama, umur, kotaAsal });

// Latihan 2: if-else dengan batas kelulusan 70.
document.getElementById("form-kelulusan").addEventListener("submit", function (event) {
    event.preventDefault();
    const nilai = Number(document.getElementById("nilai-lulus").value);
    let status;
    if (nilai >= 70) {
        status = "Lulus";
    } else {
        status = "Tidak lulus";
    }
    document.getElementById("hasil-lulus").textContent = `Nilai ${nilai}: ${status}.`;
});

// Latihan 3: if-else if-else untuk rentang umur.
document.getElementById("form-umur").addEventListener("submit", function (event) {
    event.preventDefault();
    const usia = Number(document.getElementById("umur").value);
    let kategori;
    if (usia < 12) kategori = "Anak";
    else if (usia < 18) kategori = "Remaja";
    else if (usia < 60) kategori = "Dewasa";
    else kategori = "Lansia";
    document.getElementById("hasil-umur").textContent = `${usia} tahun: ${kategori}.`;
});

// Latihan 4: konversi 1-7 menggunakan switch-case.
function namaHari(angka) {
    switch (angka) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
        default: return "Angka hari tidak valid";
    }
}
document.getElementById("form-hari").addEventListener("submit", function (event) {
    event.preventDefault();
    const hari = Number(document.getElementById("hari").value);
    document.getElementById("hasil-hari").textContent = namaHari(hari);
});

// Latihan 5: ternary bertingkat untuk grade.
function hitungGrade(nilai) {
    return nilai >= 90 ? "A" : nilai >= 80 ? "B" : nilai >= 70 ? "C" : nilai >= 60 ? "D" : "E";
}
document.getElementById("form-grade").addEventListener("submit", function (event) {
    event.preventDefault();
    const nilai = Number(document.getElementById("nilai-grade").value);
    document.getElementById("hasil-grade").textContent = `Nilai ${nilai}: grade ${hitungGrade(nilai)}.`;
});
