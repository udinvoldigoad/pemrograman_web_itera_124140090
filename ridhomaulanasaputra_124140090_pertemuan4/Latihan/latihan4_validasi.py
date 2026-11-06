def validasi_password(password):
    """Terima string password dan kembalikan True jika memenuhi kedua syarat."""
    cukup_panjang = len(password) >= 8
    ada_angka = any(karakter.isdigit() for karakter in password)
    return cukup_panjang and ada_angka


for contoh in ["Praktik4", "password", "abc123", "12345678"]:
    print(f"{contoh:<12} {validasi_password(contoh)}")