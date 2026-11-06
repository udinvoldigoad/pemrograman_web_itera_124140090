nama = "Ridho Maulana Saputra"
nim = "124140090"
angkatan = "2024"
minat = "Keamanan Siber"

print(nama, nim, angkatan, minat, sep=" | ")

baris_kartu = [
    "KARTU IDENTITAS",
    f"Nama     : {nama}",
    f"NIM      : {nim}",
    f"Angkatan : {angkatan}",
    f"Minat    : {minat}",
]

lebar = max(len(baris) for baris in baris_kartu)
bingkai = "#" * (lebar + 4)
isi = "\n".join(f"# {baris:<{lebar}} #" for baris in baris_kartu)

print(f"\n{bingkai}\n{isi}\n{bingkai}")