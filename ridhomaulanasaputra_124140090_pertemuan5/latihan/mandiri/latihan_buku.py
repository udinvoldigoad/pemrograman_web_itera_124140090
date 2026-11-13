# ==============================================================================
# Berkas: latihan_buku.py
# Deskripsi: Latihan Mandiri 2 - Class Buku dengan Diskon & Dunder Length
# ==============================================================================

class Buku:
    def __init__(self, judul: str, penulis: str, harga_asli: float, jumlah_halaman: int):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen: float) -> float:
        if not 0 <= persen <= 100:
            raise ValueError("Persentase diskon harus di antara 0 sampai 100!")
        return self.harga_asli - (self.harga_asli * persen / 100)

    def __str__(self) -> str:
        return (
            "+------------------------------------------+\n"
            f"| Judul    : {self.judul:<29} |\n"
            f"| Penulis  : {self.penulis:<29} |\n"
            f"| Harga    : Rp {self.harga_asli:<26,.0f} |\n"
            f"| Halaman  : {self.jumlah_halaman:<29} |\n"
            "+------------------------------------------+"
        )

    def __len__(self) -> int:
        return self.jumlah_halaman


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    buku1 = Buku("Laskar Pelangi", "Andrea Hirata", 95000, 529)
    buku2 = Buku("Clean Code", "Robert C. Martin", 450000, 464)

    for buku, diskon in [(buku1, 20), (buku2, 15)]:
        print(buku)
        print(f"Harga setelah diskon {diskon}% : Rp {buku.hitung_harga_diskon(diskon):,.0f}")
        print(f"len(buku) -> {len(buku)} halaman\n")

    # Uji validasi diskon tidak valid
    try:
        buku1.hitung_harga_diskon(150)
    except ValueError as err:
        print("Validasi Tertangkap:", err)
