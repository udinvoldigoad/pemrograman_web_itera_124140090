# ==============================================================================
# Berkas: latihan_toko.py
# Deskripsi: Latihan Mandiri 1 - Pemodelan Entitas Sistem Kasir Toko Online
# ==============================================================================

# ------------------------------------------------------------------------------
# CATATAN PEMODELAN ENTITAS
# ------------------------------------------------------------------------------
# 1. Produk
#    Atribut : nama, harga, stok
#    Method  : kurangi_stok(jumlah) -> mengurangi stok saat produk dibeli
#              info()               -> menampilkan informasi produk
#
# 2. Pengguna
#    Atribut : nama, email, alamat
#    Method  : buat_keranjang()     -> membuat keranjang belanja milik pengguna
#              profil()             -> menampilkan profil pengguna
#
# 3. Keranjang
#    Atribut : pemilik, daftar_item, total_harga
#    Method  : tambah_produk(produk, jumlah) -> memasukkan produk ke keranjang
#              hitung_total()                -> menghitung total belanja
#              checkout()                    -> menyelesaikan pembelian
# ------------------------------------------------------------------------------


class Produk:
    def __init__(self, nama: str, harga: float, stok: int):
        self.nama = nama
        self.harga = harga
        self.stok = stok

    def kurangi_stok(self, jumlah: int) -> bool:
        if 0 < jumlah <= self.stok:
            self.stok -= jumlah
            return True
        print(f"Stok {self.nama} tidak mencukupi! (Sisa stok: {self.stok})")
        return False

    def info(self) -> str:
        return f"{self.nama} | Rp {self.harga:,.0f} | Stok: {self.stok}"


class Pengguna:
    def __init__(self, nama: str, email: str, alamat: str):
        self.nama = nama
        self.email = email
        self.alamat = alamat

    def buat_keranjang(self):
        return Keranjang(self)

    def profil(self) -> str:
        return f"{self.nama} <{self.email}> - {self.alamat}"


class Keranjang:
    def __init__(self, pemilik: Pengguna):
        self.pemilik = pemilik
        self.daftar_item = []  # berisi pasangan (produk, jumlah)
        self.total_harga = 0.0

    def tambah_produk(self, produk: Produk, jumlah: int):
        if jumlah <= 0 or jumlah > produk.stok:
            print(f"Gagal menambahkan {produk.nama}: jumlah tidak valid atau stok kurang!")
            return
        self.daftar_item.append((produk, jumlah))
        print(f"[Keranjang {self.pemilik.nama}] +{jumlah} x {produk.nama}")
        self.hitung_total()

    def hitung_total(self) -> float:
        self.total_harga = sum(produk.harga * jumlah for produk, jumlah in self.daftar_item)
        return self.total_harga

    def checkout(self):
        print(f"\n=== CHECKOUT: {self.pemilik.nama} ===")
        for produk, jumlah in self.daftar_item:
            produk.kurangi_stok(jumlah)
            print(f" - {produk.nama} x{jumlah} = Rp {produk.harga * jumlah:,.0f}")
        print(f"Total Bayar : Rp {self.hitung_total():,.0f}")
        print(f"Dikirim ke  : {self.pemilik.alamat}")
        self.daftar_item = []


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    laptop = Produk("ASUS TUF F15", 12000000, 10)
    mouse = Produk("Mouse Logitech", 150000, 25)

    user = Pengguna("Ridho Maulana Saputra", "ridho@example.com", "Lampung Selatan")
    print("Pengguna :", user.profil())

    keranjang = user.buat_keranjang()
    keranjang.tambah_produk(laptop, 1)
    keranjang.tambah_produk(mouse, 2)
    keranjang.checkout()

    print("\n--- Stok Setelah Checkout ---")
    print(laptop.info())
    print(mouse.info())
