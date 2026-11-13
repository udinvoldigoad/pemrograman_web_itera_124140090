# ==============================================================================
# Berkas: latihan_notifikasi.py
# Deskripsi: Latihan Mandiri 5 - Engine Dispatcher Multi-Saluran Notifikasi
#            (Polymorphism via Duck Typing)
# ==============================================================================

class NotifikasiEmail:
    def __init__(self, penerima: str):
        self.penerima = penerima  # alamat email tujuan

    def kirim(self, pesan: str, penerima: str):
        print(f"[EMAIL] Kepada: {penerima}")
        print(f"        Subjek: PENGUMUMAN | Isi: {pesan}")


class NotifikasiSMS:
    def __init__(self, penerima: str):
        self.penerima = penerima  # nomor HP tujuan

    def kirim(self, pesan: str, penerima: str):
        # SMS dibatasi 160 karakter
        isi = pesan if len(pesan) <= 160 else pesan[:157] + "..."
        print(f"[SMS] Ke {penerima}: {isi}")


class NotifikasiWhatsApp:
    def __init__(self, penerima: str):
        self.penerima = penerima  # nomor WhatsApp tujuan

    def kirim(self, pesan: str, penerima: str):
        print(f"[WHATSAPP] Ke wa.me/{penerima}: *PENGUMUMAN* {pesan}")


# Fungsi polimorfik: memanggil kirim() pada semua channel tanpa peduli jenis class-nya
def broadcast_pengumuman(daftar_channel: list, pesan: str):
    print(f"=== BROADCAST PENGUMUMAN ke {len(daftar_channel)} kanal ===")
    for channel in daftar_channel:
        channel.kirim(pesan, channel.penerima)
    print("=== Broadcast selesai ===")


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    channel = [
        NotifikasiEmail("ridho@example.com"),
        NotifikasiSMS("081234567890"),
        NotifikasiWhatsApp("081234567890"),
    ]

    broadcast_pengumuman(channel, "Kelas PAW hari ini dipindah ke Gedung E ruang 301")
