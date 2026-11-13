# ==============================================================================
# Berkas: library.py
# Deskripsi: Class Library untuk menyimpan dan mengelola koleksi item
# ==============================================================================

from library_item import LibraryItem


class Library:
    """Mengelola koleksi item perpustakaan (tambah, tampilkan, cari)."""

    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi = {}  # private: {item_id: LibraryItem}

    @property
    def jumlah_item(self) -> int:
        """Total item di koleksi (hanya bisa dibaca)"""
        return len(self.__koleksi)

    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item ke koleksi. Ditolak jika bukan LibraryItem atau ID sudah ada."""
        if not isinstance(item, LibraryItem):
            print("Gagal: Objek bukan item perpustakaan!")
            return False
        if item.item_id in self.__koleksi:
            print(f"Gagal: ID {item.item_id} sudah terdaftar!")
            return False
        self.__koleksi[item.item_id] = item
        print(f"Item ditambahkan: {item.judul} ({item.item_id})")
        return True

    def tampilkan_tersedia(self):
        """Menampilkan item yang sedang tidak dipinjam."""
        tersedia = [item for item in self.__koleksi.values() if not item.is_dipinjam]
        print(f"\n=== KATALOG TERSEDIA - {self.nama} ({len(tersedia)}/{self.jumlah_item} item) ===")
        if not tersedia:
            print("Tidak ada item yang tersedia.")
        for item in tersedia:
            print(item)  # polymorphism: get_detail() berbeda tiap subclass

    def tampilkan_semua(self):
        """Menampilkan seluruh koleksi beserta statusnya."""
        print(f"\n=== SELURUH KOLEKSI - {self.nama} ===")
        for item in self.__koleksi.values():
            print(item)

    def cari_by_id(self, item_id: str):
        """Mencari item berdasarkan ID. Mengembalikan item atau None."""
        return self.__koleksi.get(item_id)

    def cari_by_judul(self, kata_kunci: str) -> list:
        """Mencari item yang judulnya mengandung kata kunci (tidak peka huruf besar/kecil)."""
        kata_kunci = kata_kunci.lower()
        return [item for item in self.__koleksi.values() if kata_kunci in item.judul.lower()]
