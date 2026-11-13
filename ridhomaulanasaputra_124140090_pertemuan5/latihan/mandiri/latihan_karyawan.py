# ==============================================================================
# Berkas: latihan_karyawan.py
# Deskripsi: Latihan Mandiri 4 - Enkapsulasi Penggajian Karyawan
# ==============================================================================

class Karyawan:
    UMR_MINIMAL = 3200000  # Upah Minimum Regional

    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        # Atribut publik
        self.nama = nama
        self.jabatan = jabatan
        # Atribut private, diisi lewat setter agar tervalidasi
        self.__gaji_pokok = 0.0
        self.gaji_pokok = gaji_pokok

    @property
    def gaji_pokok(self) -> float:
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, nilai: float):
        if not isinstance(nilai, (int, float)):
            raise TypeError("Gaji pokok harus berupa angka!")
        if nilai < Karyawan.UMR_MINIMAL:
            raise ValueError(
                f"Gaji pokok Rp {nilai:,.0f} di bawah UMR (minimal Rp {Karyawan.UMR_MINIMAL:,.0f})!"
            )
        self.__gaji_pokok = float(nilai)

    def hitung_gaji_bersih(self, pajak_persen: float) -> float:
        if not 0 <= pajak_persen <= 100:
            raise ValueError("Persentase pajak harus di antara 0 sampai 100!")
        potongan = self.__gaji_pokok * pajak_persen / 100
        return self.__gaji_pokok - potongan


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    karyawan = Karyawan("Ridho Maulana Saputra", "Backend Developer", 8500000)

    print("Nama        :", karyawan.nama)
    print("Jabatan     :", karyawan.jabatan)
    print(f"Gaji Pokok  : Rp {karyawan.gaji_pokok:,.0f}")
    print(f"Gaji Bersih : Rp {karyawan.hitung_gaji_bersih(5):,.0f} (setelah pajak 5%)")

    print("\n--- Uji Validasi Setter ---")
    try:
        karyawan.gaji_pokok = 2500000
    except ValueError as err:
        print("Validasi Tertangkap:", err)
    print(f"Gaji pokok tetap: Rp {karyawan.gaji_pokok:,.0f}")

    print("\n--- Uji Proteksi Private Attribute ---")
    try:
        print(karyawan.__gaji_pokok)
    except AttributeError:
        print("Akses langsung karyawan.__gaji_pokok GAGAL (AttributeError)!")
