# ==============================================================================
# Berkas: member.py
# Deskripsi: Class Member (anggota perpustakaan) untuk meminjam & mengembalikan item
# ==============================================================================

from library_item import LibraryItem


class Member:
    """Anggota perpustakaan yang dapat meminjam dan mengembalikan item."""

    def __init__(self, nama: str, nim: str):
        self.nama = nama
        self.__nim = nim           # private: identitas anggota
        self.__pinjaman = []       # private: daftar item yang sedang dipinjam

    @property
    def nim(self) -> str:
        """NIM anggota (hanya bisa dibaca)"""
        return self.__nim

    @property
    def pinjaman(self) -> list:
        """Salinan daftar pinjaman agar list asli tidak bisa diubah dari luar"""
        return list(self.__pinjaman)

    def pinjam(self, item: LibraryItem) -> bool:
        """Meminjam item jika statusnya tersedia."""
        if item is None:
            print(f"[{self.nama}] Gagal: item tidak ditemukan!")
            return False
        if not item.pinjam():
            print(f"[{self.nama}] Gagal meminjam '{item.judul}': sedang dipinjam orang lain.")
            return False
        self.__pinjaman.append(item)
        print(f"[{self.nama}] Berhasil meminjam '{item.judul}'")
        return True

    def kembalikan(self, item: LibraryItem, hari_terlambat: int = 0) -> int:
        """Mengembalikan item dan menghitung denda keterlambatan (polymorphism)."""
        if item not in self.__pinjaman:
            print(f"[{self.nama}] Gagal: '{item.judul}' tidak ada di daftar pinjaman.")
            return 0
        item.kembalikan()
        self.__pinjaman.remove(item)
        denda = item.hitung_denda(hari_terlambat)
        print(f"[{self.nama}] Mengembalikan '{item.judul}' | Terlambat {hari_terlambat} hari | Denda: Rp {denda:,}")
        return denda

    def __str__(self) -> str:
        return f"Member: {self.nama} ({self.__nim}) | Sedang meminjam: {len(self.__pinjaman)} item"
