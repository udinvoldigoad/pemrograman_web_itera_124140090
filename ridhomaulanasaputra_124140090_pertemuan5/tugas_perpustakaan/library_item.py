# ==============================================================================
# Berkas: library_item.py
# Deskripsi: Abstract class LibraryItem beserta subclass Book dan Magazine
# ==============================================================================

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract base class untuk semua item perpustakaan.
    Tidak bisa diinstansiasi langsung; subclass wajib mengimplementasikan
    get_detail() dan hitung_denda().
    """

    def __init__(self, item_id: str, judul: str, tahun: int):
        self._item_id = item_id      # protected: id unik item
        self._judul = judul          # protected: judul item
        self._tahun = tahun          # protected: tahun terbit
        self.__dipinjam = False      # private: status peminjaman

    # ---------------- PROPERTY (read-only dari luar) ----------------
    @property
    def item_id(self) -> str:
        """ID unik item (hanya bisa dibaca)"""
        return self._item_id

    @property
    def judul(self) -> str:
        """Judul item (hanya bisa dibaca)"""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """True jika item sedang dipinjam"""
        return self.__dipinjam

    # ---------------- METHOD UMUM (dipakai semua subclass) ----------------
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. Gagal jika sudah dipinjam."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Menandai item sebagai tersedia kembali."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    def status(self) -> str:
        """Mengembalikan teks status ketersediaan item."""
        return "Dipinjam" if self.__dipinjam else "Tersedia"

    # ---------------- ABSTRACT METHOD (wajib di-override) ----------------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan deskripsi lengkap item"""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda keterlambatan sesuai jenis item"""
        pass

    def __str__(self) -> str:
        return f"[{self._item_id}] {self.get_detail()} | Status: {self.status()}"


class Book(LibraryItem):
    """Item perpustakaan berupa buku."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, tahun: int, penulis: str):
        super().__init__(item_id, judul, tahun)
        self._penulis = penulis

    def get_detail(self) -> str:
        return f"Buku    : {self._judul} - {self._penulis} ({self._tahun})"

    def hitung_denda(self, hari_terlambat: int) -> int:
        return max(0, hari_terlambat) * Book.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Item perpustakaan berupa majalah."""

    DENDA_PER_HARI = 500

    def __init__(self, item_id: str, judul: str, tahun: int, edisi: int):
        super().__init__(item_id, judul, tahun)
        self._edisi = edisi

    def get_detail(self) -> str:
        return f"Majalah : {self._judul} Edisi {self._edisi} ({self._tahun})"

    def hitung_denda(self, hari_terlambat: int) -> int:
        return max(0, hari_terlambat) * Magazine.DENDA_PER_HARI
