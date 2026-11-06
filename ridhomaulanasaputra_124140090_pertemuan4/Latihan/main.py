from password_gen import buat_password_acak


if __name__ == "__main__":
    password_bawaan = buat_password_acak()
    password_panjang = buat_password_acak(12)

    print(f"Default: {password_bawaan} ({len(password_bawaan)} karakter)")
    print(f"Kustom : {password_panjang} ({len(password_panjang)} karakter)")