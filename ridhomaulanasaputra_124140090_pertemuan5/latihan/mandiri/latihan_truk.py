# ==============================================================================
# Berkas: latihan_truk.py
# Deskripsi: Latihan Mandiri 3 - Armada Truk Ekspedisi Kargo (Inheritance)
# ==============================================================================

# Superclass Kendaraan (versi ringkas dari 03_inheritance.py)
class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def klakson(self) -> str:
        return "Tin tin!"


# Subclass Truk mewarisi Kendaraan
class Truk(Kendaraan):
    def __init__(self, merek: str, model: str, tahun: int, kapasitas_maksimal_ton: float):
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    def muat_barang(self, berat_ton: float) -> bool:
        if berat_ton <= 0:
            print("Gagal: Berat muatan harus lebih dari 0 ton!")
            return False
        if self.muatan_saat_ini + berat_ton > self.kapasitas_maksimal_ton:
            sisa = self.kapasitas_maksimal_ton - self.muatan_saat_ini
            print(f"Gagal memuat {berat_ton} ton: melebihi kapasitas! (Sisa ruang: {sisa} ton)")
            return False
        self.muatan_saat_ini += berat_ton
        print(f"Berhasil memuat {berat_ton} ton. Muatan sekarang: {self.muatan_saat_ini} ton")
        return True

    # METHOD OVERRIDING: Menampilkan beban muatan saat ini
    def deskripsi(self) -> str:
        return (f"{super().deskripsi()} [Truk Kargo | Muatan: "
                f"{self.muatan_saat_ini}/{self.kapasitas_maksimal_ton} ton]")


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    fuso = Truk("Mitsubishi", "Fuso Fighter", 2021, kapasitas_maksimal_ton=8)

    print(fuso.deskripsi())
    print("\n--- Proses Muat Barang ---")
    fuso.muat_barang(3)
    fuso.muat_barang(4.5)
    fuso.muat_barang(2)  # Melebihi kapasitas

    print("\n--- Deskripsi Setelah Dimuat ---")
    print(fuso.deskripsi())
    print("Apakah fuso instance dari Kendaraan?:", isinstance(fuso, Kendaraan))
