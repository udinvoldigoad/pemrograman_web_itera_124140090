"use strict";

// Hubungkan elemen HTML dengan JavaScript.
const form = document.getElementById("form-barang");
const namaInput = document.getElementById("nama");
const hargaInput = document.getElementById("harga");
const qtyInput = document.getElementById("qty");
const isiKeranjang = document.getElementById("isi-keranjang");
const uangInput = document.getElementById("uang-bayar");
const hasilBayar = document.getElementById("hasil-bayar");
const status = document.getElementById("status");
const storageError = document.getElementById("storage-error");
const STORAGE_KEY = "mini-pos-124140090";
const rupiah = nilai => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 2
}).format(nilai);

// Array simpen objek barang pas aplikasi jalan.
let keranjang = muatKeranjang();

// Data localStorage berupa teks; JSON.parse mengubahnya jadi array.
function muatKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Periksa data yang kesimpen agar data rusak ga buat kalkulasi NaN.
    if (!Array.isArray(data) || !data.every(barang => barang &&
      typeof barang.nama === "string" && barang.nama.trim().length >= 3 &&
      Number.isFinite(barang.harga) && barang.harga >= 500 &&
      Number.isInteger(barang.qty) && barang.qty >= 1 &&
      Number.isFinite(barang.harga * barang.qty))) {
      throw new Error("Data keranjang tidak valid");
    }
    return data;
  } catch {
    storageError.textContent = "Keranjang tersimpan tidak dapat dibaca. Aplikasi dimulai dengan keranjang kosong.";
    return [];
  }
}

function simpanKeranjang() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
    storageError.textContent = "";
  } catch {
    storageError.textContent = "Penyimpanan browser gagal. Keranjang saat ini belum tersimpan untuk refresh.";
  }
}

// Validasi dan penambahan barang.
function tampilkanError(id, pesan) {
  document.getElementById("error-" + id).textContent = pesan;
  document.getElementById(id).setAttribute("aria-invalid", pesan ? "true" : "false");
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Cegah submit bawaan yang memuat ulang halaman.
  status.textContent = "";
  const nama = namaInput.value.trim();
  const harga = Number(hargaInput.value);
  const qty = Number(qtyInput.value);
  const errorNama = nama.length < 3 ? "Nama barang wajib diisi, minimal 3 karakter." : "";
  const errorHarga = hargaInput.value.trim() === "" || !Number.isFinite(harga) || harga < 500
    ? "Harga wajib berupa angka minimal Rp500." : "";
  const errorQty = qtyInput.value.trim() === "" || !Number.isInteger(qty) || qty < 1
    ? "Jumlah wajib berupa angka bulat minimal 1." : "";
  tampilkanError("nama", errorNama);
  tampilkanError("harga", errorHarga);
  tampilkanError("qty", errorQty);
  if (errorNama || errorHarga || errorQty) return; // Data salah berhenti di sini.
  if (!Number.isFinite(harga * qty) || !Number.isFinite(hitungTotal().total + harga * qty)) {
    tampilkanError("harga", "Nominal terlalu besar untuk dihitung. Kurangi harga atau jumlah.");
    return;
  }
  keranjang.push({ nama, harga, qty });
  simpanKeranjang();
  renderKeranjang();
  form.reset(); // Qty kembali ke nilai awal 1.
  namaInput.focus();
  status.textContent = nama + " ditambahkan ke keranjang.";
});

// Perhitungan dipisah dari tampilan biar mudah dipahami.
function hitungTotal() {
  const total = keranjang.reduce((jumlah, barang) => jumlah + barang.harga * barang.qty, 0);
  // Bulatkan nominal diskon ke rupiah terdekat.
  const diskon = total >= 50000 ? Math.round(total * 0.1) : 0;
  return { total, diskon, totalAkhir: total - diskon };
}

// Buat ulang tabel dari array, trus update semua total.
function renderKeranjang() {
  isiKeranjang.replaceChildren();
  if (keranjang.length === 0) {
    const baris = document.createElement("tr");
    const kolom = document.createElement("td");
    kolom.colSpan = 6;
    kolom.className = "empty";
    kolom.textContent = "Keranjang kosong. Tambahkan barang pertama.";
    baris.append(kolom);
    isiKeranjang.append(baris);
  }
  keranjang.forEach((barang, index) => {
    const baris = document.createElement("tr");
    const nilaiKolom = [index + 1, barang.nama, rupiah(barang.harga), barang.qty, rupiah(barang.harga * barang.qty)];
    nilaiKolom.forEach(nilai => {
      const kolom = document.createElement("td");
      kolom.textContent = nilai; // Nama barang diperlakukan sebagai teks biasa.
      baris.append(kolom);
    });
    const kolomAksi = document.createElement("td");
    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = "hapus";
    tombol.textContent = "Hapus";
    tombol.setAttribute("aria-label", "Hapus " + barang.nama);
    tombol.addEventListener("click", () => {
      keranjang.splice(index, 1);
      simpanKeranjang();
      renderKeranjang();
      status.textContent = barang.nama + " dihapus.";
    });
    kolomAksi.append(tombol);
    baris.append(kolomAksi);
    isiKeranjang.append(baris);
  });
  const { total, diskon, totalAkhir } = hitungTotal();
  document.getElementById("jumlah-item").textContent = keranjang.length + " barang";
  document.getElementById("total").textContent = rupiah(total);
  document.getElementById("diskon").textContent = rupiah(diskon);
  document.getElementById("total-akhir").textContent = rupiah(totalAkhir);
  hitungPembayaran();
}

// Event input jalan setiap nominal pembayaran berubah.
function hitungPembayaran() {
  hasilBayar.className = "payment-message";
  if (keranjang.length === 0) {
    hasilBayar.textContent = "Tambahkan barang sebelum menghitung pembayaran.";
    return;
  }
  if (uangInput.value.trim() === "") {
    hasilBayar.textContent = "Masukkan uang bayar untuk menghitung kembalian.";
    return;
  }
  const uang = Number(uangInput.value);
  if (!Number.isFinite(uang) || uang < 0) {
    hasilBayar.classList.add("error");
    hasilBayar.textContent = "Uang bayar harus berupa angka minimal 0.";
    return;
  }
  const kembalian = uang - hitungTotal().totalAkhir;
  hasilBayar.classList.add(kembalian < 0 ? "error" : "success");
  hasilBayar.textContent = kembalian < 0
    ? "Uang belum mencukupi. Kurang " + rupiah(-kembalian) + "."
    : "Kembalian: " + rupiah(kembalian);
}
uangInput.addEventListener("input", hitungPembayaran);

// Reset hanya hapus kunci milik aplikasi ini.
document.getElementById("reset").addEventListener("click", () => {
  if (keranjang.length && !window.confirm("Kosongkan keranjang dan mulai transaksi baru?")) return;
  keranjang = [];
  try {
    localStorage.removeItem(STORAGE_KEY);
    storageError.textContent = "";
  } catch {
    storageError.textContent = "Penyimpanan browser gagal dibersihkan. Data lama mungkin muncul setelah refresh.";
  }
  form.reset();
  ["nama", "harga", "qty"].forEach(id => tampilkanError(id, ""));
  uangInput.value = "";
  renderKeranjang();
  status.textContent = "Transaksi baru siap dimulai.";
  namaInput.focus();
});

// Tampilkan data yang dimuat pas halaman pertama kali dibuka.
renderKeranjang();
