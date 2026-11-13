# ==============================================================================
# Berkas: latihan_storage.py
# Deskripsi: Latihan Mandiri 6 - Interface File Storage Service (Abstract Class)
# ==============================================================================

from abc import ABC, abstractmethod


class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        pass

    @abstractmethod
    def download_file(self, nama_file: str) -> bytes:
        pass


class LocalDiskStorage(FileStorage):
    """Simulasi penyimpanan di folder lokal (disimpan di memori)"""
    def __init__(self, folder: str):
        self.folder = folder
        self._disk = {}

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        path = f"{self.folder}/{nama_file}"
        self._disk[path] = data_bytes
        print(f"[LocalDisk] Tersimpan di {path} ({len(data_bytes)} bytes)")
        return True

    def download_file(self, nama_file: str) -> bytes:
        path = f"{self.folder}/{nama_file}"
        if path not in self._disk:
            raise FileNotFoundError(f"[LocalDisk] File {path} tidak ditemukan!")
        print(f"[LocalDisk] Membaca file dari {path}")
        return self._disk[path]


class CloudStorage(FileStorage):
    """Simulasi penyimpanan ke server cloud (disimpan di memori)"""
    def __init__(self, nama_bucket: str):
        self.nama_bucket = nama_bucket
        self._server = {}

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        print(f"[Cloud] Mengunggah {nama_file} ke bucket '{self.nama_bucket}'...")
        self._server[nama_file] = data_bytes
        print(f"[Cloud] Upload sukses: https://cloud.example.com/{self.nama_bucket}/{nama_file}")
        return True

    def download_file(self, nama_file: str) -> bytes:
        if nama_file not in self._server:
            raise FileNotFoundError(f"[Cloud] Objek {nama_file} tidak ada di bucket '{self.nama_bucket}'!")
        print(f"[Cloud] Mengunduh {nama_file} dari bucket '{self.nama_bucket}'")
        return self._server[nama_file]


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    print("--- 1. Pembuktian Enforcement Abstract Class ---")
    try:
        storage = FileStorage()
    except TypeError as err:
        print("Penolakan Python Terbukti:", err)

    data = "Tugas Pertemuan 5 - Ridho Maulana Saputra 124140090".encode("utf-8")
    daftar_storage = [LocalDiskStorage("uploads"), CloudStorage("paw-praktikum")]

    print("\n--- 2. Upload & Download di Setiap Storage ---")
    for s in daftar_storage:
        s.upload_file("tugas_paw.txt", data)
        hasil = s.download_file("tugas_paw.txt")
        print("Isi file:", hasil.decode("utf-8"), "\n")

    print("--- 3. Download File yang Tidak Ada ---")
    for s in daftar_storage:
        try:
            s.download_file("tidak_ada.pdf")
        except FileNotFoundError as err:
            print(err)
