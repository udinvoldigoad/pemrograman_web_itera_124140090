kontak = {"Udin": "081367289083"}

while True:
    print("\n1. Tambah kontak")
    print("2. Cari kontak")
    print("3. Tampilkan semua kontak")
    print("0. Keluar")
    pilihan = input("Pilih menu: ").strip()

    if pilihan == "1":
        nama = input("Nama: ").strip().title()
        nomor = input("Nomor telepon: ").strip()
        kontak[nama] = nomor
        print("Kontak tersimpan.")

    elif pilihan == "2":
        nama = input("Nama yang dicari: ").strip().title()
        print(kontak.get(nama, "Kontak tidak ditemukan."))

    elif pilihan == "3":
        for nama, nomor in kontak.items():
            print(f"{nama}: {nomor}")

    elif pilihan == "0":
        break

    else:
        print("Pilihan tidak tersedia.")