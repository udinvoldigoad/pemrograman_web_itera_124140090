"use strict";

// Latihan 1: for loop menghasilkan sepuluh baris tabel.
document.getElementById("form-perkalian").addEventListener("submit", function (event) {
    event.preventDefault();
    const angka = Number(document.getElementById("angka-kali").value);
    const tabel = document.getElementById("tabel-perkalian");
    tabel.replaceChildren();
    for (let i = 1; i <= 10; i++) {
        const baris = document.createElement("tr");
        for (const teks of [`${angka} × ${i}`, angka * i]) {
            const kolom = document.createElement("td");
            kolom.textContent = teks;
            baris.append(kolom);
        }
        tabel.append(baris);
    }
});

// Latihan 2: perkalian berulang; hasil awal 1 juga menangani 0!.
function faktorial(angka) {
    let hasil = 1;
    for (let i = 2; i <= angka; i++) hasil *= i;
    return hasil;
}
document.getElementById("form-faktorial").addEventListener("submit", function (event) {
    event.preventDefault();
    const angka = Number(document.getElementById("angka-faktorial").value);
    document.getElementById("hasil-faktorial").textContent = `${angka}! = ${faktorial(angka)}`;
});

// Latihan 3: cukup memeriksa pembagi sampai akar kuadrat angka.
function apakahPrima(angka) {
    if (!Number.isInteger(angka) || angka < 2) return false;
    for (let pembagi = 2; pembagi * pembagi <= angka; pembagi++) {
        if (angka % pembagi === 0) return false;
    }
    return true;
}
document.getElementById("form-prima").addEventListener("submit", function (event) {
    event.preventDefault();
    const angka = Number(document.getElementById("angka-prima").value);
    document.getElementById("hasil-prima").textContent = `${angka} ${apakahPrima(angka) ? "adalah" : "bukan"} bilangan prima.`;
});

// Latihan 4: fungsi perhitungan dipanggil saat form disubmit.
function hitungBmi(berat, tinggiCm) {
    const tinggiMeter = tinggiCm / 100;
    return berat / (tinggiMeter * tinggiMeter);
}
document.getElementById("form-bmi").addEventListener("submit", function (event) {
    event.preventDefault();
    const berat = Number(document.getElementById("berat").value);
    const tinggi = Number(document.getElementById("tinggi").value);
    document.getElementById("hasil-bmi").textContent = `BMI: ${hitungBmi(berat, tinggi).toFixed(2)}`;
});

// Latihan 5: periksa kelipatan 15 lebih dahulu agar menghasilkan FizzBuzz.
const hasilFizzBuzz = [];
for (let angka = 1; angka <= 100; angka++) {
    if (angka % 15 === 0) hasilFizzBuzz.push("FizzBuzz");
    else if (angka % 3 === 0) hasilFizzBuzz.push("Fizz");
    else if (angka % 5 === 0) hasilFizzBuzz.push("Buzz");
    else hasilFizzBuzz.push(String(angka));
}
document.getElementById("hasil-fizzbuzz").textContent = hasilFizzBuzz.join(", ");
console.log(hasilFizzBuzz.join("\n"));
