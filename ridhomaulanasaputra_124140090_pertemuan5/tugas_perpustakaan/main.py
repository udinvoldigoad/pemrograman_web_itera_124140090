# ==============================================================================
# Berkas: main.py
# Deskripsi: Skrip pengujian Sistem Manajemen Perpustakaan Sederhana
# ==============================================================================

from library_item import LibraryItem, Book, Magazine
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    # 1. Menambahkan item ke perpustakaan
    print("=== 1. MENAMBAHKAN ITEM ===")
    perpus.tambah_item(Book("B001", "Laskar Pelangi", 2005, "Andrea Hirata"))
    perpus.tambah_item(Book("B002", "Clean Code", 2008, "Robert C. Martin"))
    perpus.tambah_item(Book("B003", "Bumi", 2014, "Tere Liye"))
    perpus.tambah_item(Magazine("M001", "Tempo", 2025, 45))
    perpus.tambah_item(Magazine("M002", "National Geographic Indonesia", 2025, 12))
    perpus.tambah_item(Book("B001", "Buku Duplikat", 2020, "Anonim"))  # ID duplikat

    # 2. Menampilkan katalog item yang tersedia
    perpus.tampilkan_tersedia()

    # 3. Mencari item berdasarkan ID dan judul
    print("\n=== 3. PENCARIAN ITEM ===")
    hasil_id = perpus.cari_by_id("M001")
    print("Cari ID 'M001'     :", hasil_id if hasil_id else "Tidak ditemukan")
    print("Cari ID 'X999'     :", perpus.cari_by_id("X999") or "Tidak ditemukan")

    print("Cari judul 'code'  :")
    for item in perpus.cari_by_judul("code"):
        print("  ", item)
    print("Cari judul 'harry' :", perpus.cari_by_judul("harry") or "Tidak ditemukan")

    # 4. Demonstrasi status ketersediaan (peminjaman oleh member)
    print("\n=== 4. PEMINJAMAN & STATUS KETERSEDIAAN ===")
    ridho = Member("Ridho Maulana Saputra", "124140090")
    andri = Member("Andriyano Sevchenko Limbong", "124140091")

    ridho.pinjam(perpus.cari_by_id("B002"))
    ridho.pinjam(perpus.cari_by_id("M001"))
    andri.pinjam(perpus.cari_by_id("B002"))  # sudah dipinjam Ridho
    andri.pinjam(perpus.cari_by_id("B003"))

    print(ridho)
    print(andri)
    print("Status 'Clean Code' dipinjam?:", perpus.cari_by_id("B002").is_dipinjam)

    perpus.tampilkan_tersedia()

    # 5. Pengembalian & denda (polymorphism: hitung_denda berbeda per jenis item)
    print("\n=== 5. PENGEMBALIAN & DENDA ===")
    ridho.kembalikan(perpus.cari_by_id("B002"), hari_terlambat=3)
    ridho.kembalikan(perpus.cari_by_id("M001"), hari_terlambat=3)
    andri.kembalikan(perpus.cari_by_id("B003"))

    perpus.tampilkan_semua()

    # 6. Bukti abstraction & encapsulation
    print("\n=== 6. UJI ABSTRACTION & ENCAPSULATION ===")
    try:
        LibraryItem("X001", "Item Abstrak", 2024)
    except TypeError as err:
        print("Abstract class ditolak:", err)

    try:
        print(perpus.__koleksi)
    except AttributeError:
        print("Akses langsung perpus.__koleksi GAGAL (atribut private)!")

    try:
        perpus.cari_by_id("B001").is_dipinjam = True
    except AttributeError:
        print("Mengubah is_dipinjam langsung GAGAL (property read-only)!")


if __name__ == "__main__":
    main()
