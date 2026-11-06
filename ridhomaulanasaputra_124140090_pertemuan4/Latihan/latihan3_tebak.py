angka_rahasia = 7

while True:
    tebakan = int(input("Tebak angka: "))

    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break